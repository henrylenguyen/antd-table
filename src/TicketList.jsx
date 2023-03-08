
import { Avatar, Image } from "antd";
import React from "react";
import removeVietnameseTones from "./convertVietnamese";
import CustomTable from "./CustomTable";
const data = [
  {
    maLichChieu: 44239,
    tenCumRap: "CGV - Aeon Tân Phú",
    tenRap: "Rạp 5",
    diaChi: "30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú",
    tenPhim: "Lat mat 48h1234",
    hinhAnh:
      "https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h123_gp01.jpg",
    ngayChieu: "01/09/2021",
    gioChieu: "07:09",
  },
  {
    maLichChieu: 44240,
    tenCumRap: "CGV - Aeon Tân Phú",
    tenRap: "Rạp 5",
    diaChi: "30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú",
    tenPhim: "Lat mat 48h1234",
    hinhAnh:
      "https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h123_gp01.jpg",
    ngayChieu: "01/09/2021",
    gioChieu: "07:09",
  },
];
// 1. Lấy ra tất cả các key của object
const keys = data && Object.keys(data[0]);
console.log("keys:", keys);
/* 2. Từ những key của object biến nó thành 1 mảng các đối tượng 
  ví dụ: [
    {
      dataIndex: "maLichChieu",
      key: "maLichChieu"
    }
  ]
*/
const dataIndexKey = keys?.map((item) => {
  return {
    dataIndex: item,
    key: item,
  };
});
console.log("dataIndexKey:", dataIndexKey);
// 3. Tạo ra mảng title chứa các đối tượng title khác nhau, do mình nhập
const dataTitle = [
  { title: "Mã lịch chiếu" },
  { title: "Hình Ảnh" },
  { title: "Tên cụm rạp" },
  { title: "Tên rạp" },
  { title: "Địa chỉ" },
  { title: "Tên phim" },
  { title: "Ngày chiếu" },
  { title: "Giờ chiếu" },
];
console.log("dataTitle:", dataTitle);

/**
 * 4. Từ mảng đối tượng (3) kết hợp với mảng các đối tượng (4) thành
 *  
 * const columns = [
 * {
 *   title: "Mã lịch chiếu",
 *   dataIndex: "maLichChieu",
     key: "maLichChieu"  
 * }
 * ]
 */
const columns = dataTitle.map(title=>{
  // biến chữ tiếng việt có dấu thành không dấu
  const removeTone = removeVietnameseTones(title.title);
  /* Loại bỏ hết các khoảng trống ở giữa và biến thành in thường
   ví dụ: Mã lịch chiếu ->malichchieu
  */
  const newTitle = removeTone.replace(/\s+/g, "").toLowerCase();
  // dùng hàm find để tìm từ mảng các đối tượng dataIndexKey, so sánh giữa key với newTitle phía trên. Lưu ý là phải chuyển về in thường để so sánh
  const dataIndexKeyItem = dataIndexKey.find(
    (item) => item.key.toLowerCase() === newTitle
  );
  // trả về mảng các đối tượng
  if (newTitle === "hinhanh") {
    return {
      title: title.title,
      dataIndex: dataIndexKeyItem.dataIndex,
      key: dataIndexKeyItem.key,
      render: (text)=> <Image src={text} width="100px"></Image>,
    
    };
  }
  if (newTitle === "avatar") {
    return {
      title: title.title,
      dataIndex: dataIndexKeyItem.dataIndex,
      key: dataIndexKeyItem.key,
      render: (text)=> <Avatar src={text} size="large"></Avatar>,
    
    };
  }
  return {
    title: title.title,
    dataIndex: dataIndexKeyItem.dataIndex,
    key: dataIndexKeyItem.key,
    width: 250
  };
})
console.log("columns:", columns);
// từ đó truyền vào customTable
const TicketList = () => {
  return <CustomTable columns={columns} data={data}></CustomTable>;
};

export default TicketList;
