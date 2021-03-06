import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getBookingList } from "../../../store/actions/booking.action";
import axios from "axios";
import { notification, Popconfirm } from "antd";
import Swal from "sweetalert2";
import { useIsLogin } from "../../../hooks/useIsLogin";
function Booking() {
  const dispatch = useDispatch();

  const { infoBooking, listChair } = useSelector((state) => state.booking);
  const { isLogin, user } = useIsLogin();

  // lấy maLichChieu từ url xuống
  const { maLichChieu } = useParams();
  // tương đương componentDidMount
  useEffect(
    () => {
      dispatch(getBookingList(maLichChieu));
    },
    // eslint-disable-next-line
    []
  );
  const [danhSachChon, setDanhSachChon] = useState([]);
  const [danhsachVeChon, setDanhSachVeChon] = useState([]);
  const renderListChair = () => {
    if (listChair.length > 0) {
      return listChair.map((chair, index) => {
        for (let i = 0; i < danhSachChon.length; i++) {
          if (chair.maGhe === danhSachChon[i].maGhe) {
            return (
              <button
                className="price__btn-booking-warning"
                key={index}
                onClick={() => {
                  let temp = [...danhSachChon];
                  let veChon = [...danhsachVeChon];

                  veChon.splice(i, 1);
                  setDanhSachVeChon(veChon);

                  temp.splice(i, 1);
                  setDanhSachChon(temp);
                }}
              >
                {danhSachChon[i].tenGhe}
              </button>
            );
          }
        }
        let classLoaiGhe =
          chair.loaiGhe === "Vip"
            ? "price__btn-booking-vip"
            : "price__btn-booking";
        return (
          <button
            className={
              chair.daDat ? "price__btn-booking-danger" : `${classLoaiGhe}`
            }
            disabled={chair.daDat ? true : false}
            key={index}
            onClick={() => {
              setDanhSachChon([
                ...danhSachChon,
                {
                  maGhe: chair.maGhe,
                  giaVe: chair.giaVe,
                  tenGhe: chair.tenGhe,
                  maLichChieu: infoBooking.maLichChieu,
                  taikhoanNguoiDung: user.taiKhoan,
                },
              ]);
              setDanhSachVeChon([
                ...danhsachVeChon,
                {
                  maGhe: chair.maGhe,
                  giaVe: chair.giaVe,
                },
              ]);
            }}
          >
            {chair.daDat ? "x" : chair.tenGhe}
          </button>
        );
      });
    }
  };
  const renderOrder = () => {
    if (danhSachChon.length > 0) {
      return danhSachChon.map((chair, index) => {
        return (
          <tr key={index}>
            <td>{chair.tenGhe}</td>
            <td colSpan="3">{chair.giaVe.toLocaleString()}đ</td>
          </tr>
        );
      });
    }
  };
  const totalOrder = () => {
    if (danhSachChon.length > 0) {
      return danhSachChon
        .reduce((total, chair) => {
          return (total += chair.giaVe);
        }, 0)
        .toLocaleString();
    }
  };
  // time giữ ghế
  const [time, setTime] = useState("");
  function CountDown(duration) {
    if (!isNaN(duration)) {
      var timer = duration,
        minutes,
        seconds;

      var interVal = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        setTime(`${minutes}:${seconds}`);
        if (--timer < 0) {
          clearInterval(interVal);
          timer = duration;
          Swal.fire({
            title: "Time out for booking",
            icon: "warning",
            confirmButtonColor: "#ff55a5",
            confirmButtonText: "Reservation Back",
          }).then((result) => {
            if (result.value) {
              window.location.reload(true);
            } else {
              window.location.reload(true);
            }
          });
        }
      }, 1000);
    }
  }
  const history = useHistory();
  const handleBookTicket = (danhSach) => {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    const token = user.accessToken;
    if (danhSach.length > 0) {
      const data = {
        maLichChieu: danhSach[0].maLichChieu,
        danhSachVe: [...danhsachVeChon],
        taikhoanNguoiDung: danhSach[0].taikhoanNguoiDung,
      };
      return axios({
        method: "POST",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      })
        .then((res) => {
          Swal.fire({
            title: "Successful Booking",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đặt vé tiếp",
            cancelButtonText: "Thoát",
          }).then((result) => {
            if (result.value) {
              history.goBack();
            } else {
              return history.push("/");
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Please log in to book your ticket.",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
    return notification.info({
      message: `Booking failed !!!`,
      description:
        "Your seat reservation list is empty, please choose the chair.",
      placement: "topLeft",
      duration: 3,
    });
  };
  useEffect(() => {
    CountDown(600);

    return () => {
      CountDown("a");
    };
  }, []);
  return (
    <>
      <section className="section details">
        {/* details background */}
        <div className="details__bg" data-bg="img/home/home__bg.jpg" />
        {/* end details background */}
        {/* details content */}
        <div className="container">
          <div className="row">
            {/* content */}
            <div className="col-12 col-xl-8">
              <div className="bg-booking">
                <img
                  style={{ width: "100%" }}
                  src="/img/bg-screen.png"
                  alt="bg-screen"
                />
              </div>
              <div style={{ textAlign: "center" }} className="list-chair">
                {renderListChair()}
              </div>
              <div class="price price--premium">
                <div class="price__item-booking">
                  
                    
                 
                </div>
              </div>
            </div>
            {/* end content */}
            {/* player */}
            <div className="col-12 col-xl-4">
              <div class="price price--premium">
                <div class="price__item price__item--first">
                  <span>Movie name</span>
                  <span>{infoBooking.tenPhim}</span>
                </div>
                <div class="price__item">
                  <span>Theatre: </span>
                  <span>{infoBooking.tenCumRap}</span>
                </div>
                <div class="price__item">
                  <span>Time: </span>
                  <span>
                    {infoBooking.gioChieu} - {infoBooking.ngayChieu}
                  </span>
                </div>
                <div class="price__item">
                  <span>Price : </span>
                  <span>{infoBooking.tenRap}</span>
                </div>
                <div class="price__item">
                  <span>Time hold the chair : </span>
                  <span>{time}</span>
                </div>
              </div>
              <div class="price price--premium">
                <table className="order__table">
                  <thead>
                    <tr>
                      <th>Seat NO.</th>
                      <th colSpan="2">2</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{renderOrder()}</tbody>
                  <tfoot>
                    <tr>
                      <td>Total :</td>
                      <td colSpan="3">{totalOrder()}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
                {isLogin ? (
                  <>
                    <Popconfirm
                      placement="bottom"
                      title="Are you sure you booked tickets?"
                      onConfirm={() => {
                        handleBookTicket(danhSachChon);
                      }}
                      okText="ok"
                      cancelText="cancel"
                    >
                      <button className="price__btn"></button>
                    </Popconfirm>
                  </>
                ) : (
                  <Popconfirm
                    style={{ backgroundColor: "#fff" }}
                    placement="bottom"
                    title="Are you sure you booked tickets?"
                    onConfirm={() => {
                      Swal.fire({
                        icon: "error",
                        title: "you must login to book tickets",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }}
                    okText="ok"
                    cancelText="cancel
                    "
                  >
                    <button className="price__btn">Book</button>
                  </Popconfirm>
                )}
              </div>
            </div>
            {/* end player */}
          </div>
        </div>
        {/* end details content */}
      </section>
    </>
  );
}
export default Booking;
