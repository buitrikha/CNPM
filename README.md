# Hướng dẫn quản lý ảnh sản phẩm

## Cấu trúc thư mục
```
images/
├── ao-thun-nam.jpg
├── quan-jean-nu.jpg
├── giay-the-thao.jpg
├── ao-khoac-nam.jpg
├── vay-lien-than.jpg
├── tui-xach-nu.jpg
├── mu-luoi-trai.jpg
└── default-product.jpg (ảnh mặc định khi không tìm thấy ảnh sản phẩm)
```

## Danh sách sản phẩm
1. Áo thun nam - 150,000 VNĐ
2. Quần jean nữ - 300,000 VNĐ
3. Giày thể thao - 500,000 VNĐ
4. Áo khoác nam - 450,000 VNĐ
5. Váy liền thân - 350,000 VNĐ
6. Túi xách nữ - 250,000 VNĐ
7. Mũ lưỡi trai - 120,000 VNĐ

## Quy tắc đặt tên ảnh
1. Tên file ảnh phải viết thường, không dấu
2. Sử dụng dấu gạch ngang (-) để ngăn cách các từ
3. Hỗ trợ cả 2 định dạng: .jpg và .png
4. Ví dụ: `ao-thun-nam.jpg`, `quan-jean-nu.png`

## Kích thước ảnh khuyến nghị
- Chiều rộng: 800px
- Chiều cao: 1000px
- Tỷ lệ: 4:5
- Định dạng: JPG hoặc PNG
- Dung lượng: Tối ưu dưới 500KB

## Cách thêm ảnh sản phẩm mới
1. Đặt ảnh vào thư mục `images/`
2. Cập nhật thông tin sản phẩm trong file `script.js`:
```javascript
{
    id: 8, // Số thứ tự tiếp theo
    name: "Tên sản phẩm",
    price: 100000,
    image: "images/ten-san-pham.jpg", // hoặc .png
    category: "Danh mục",
    description: "Mô tả sản phẩm"
}
```

## Lưu ý
- Luôn giữ một ảnh `default-product.jpg` trong thư mục images
- Đảm bảo ảnh có chất lượng tốt và kích thước phù hợp
- Nén ảnh trước khi upload để tối ưu tốc độ tải trang
- Đặt tên file ảnh theo quy tắc đã định để tránh lỗi hiển thị 