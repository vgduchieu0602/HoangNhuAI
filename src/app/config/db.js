import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

console.log("Cached: ", cached);

export default async function connectDB() {
  //Kiểm tra kết nối hiện có
  if (cached.conn) {
    return cached.conn;
  }

  //Tạo kết nối mới nếu chưa có
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI)
      .then((mongoose) => mongoose);
  }

  //Xử lý kết nối
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }

  return cached.conn;
}

/** === Cơ chế Cached ===
 * - File sử dụng cơ chế cached để tránh tạo nhiều kết nối không cần thiết
 * - Khi ứng dụng cần kết nối database, sẽ:
 *  + Sử dụng kết nối đã có nếu tồn tại
 *  + Tạo kết nối mới nếu chưa có
 *  + Lưu trữ kết nối để tái sử dụng
 */
