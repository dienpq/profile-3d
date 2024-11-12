import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


// Tạo bối cảnh
const scene = new THREE.Scene();
// Có thể có nhiều camera khác nhau: PerspectiveCamera chỉ là 1 cách
// - Thuộc tính đầu tiên fov là phạm vi của cảnh được nhìn thấy trên màn hình tại bất kỳ thời điển nào (giá trị được tính bằng độ)
// - Thuộc tính thứ 2 là tỉ lệ khung hình
// - Hai thuộc tính tiếp theo là mặt phẳng cắt gần và xa (có nghĩa là: các vật thể ở xa máy ảnh hơn giá trị hoặc ở gần hơn sẽ không được hiển thị )
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(5, 5, 5); // Di chuyển camera lên cao để quan sát rõ hơn
camera.lookAt(0, 0, 0); // Đảm bảo camera hướng về gốc tọa độ

// - Tiếp theo là trình kết xuất
const renderer = new THREE.WebGLRenderer();
// + Chọn chiều rộng và chiều cao của khu vực muốn hiển thị
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Tạo khối lập phương (sử dụng BoxGeometry để tạo ra hình khối lập phương)
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// Sử dụng MeshBasicMaterial để tô màu cho khối
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// Lấy geometry kết hợp với material
const cube = new THREE.Mesh( geometry, material );
// Chèn khối vào bối cảnh
// Mặc định khi chèn vào thì khối sẽ chèn vào tọa độ (0, 0, 0)
scene.add( cube );

// Hỗ trợ đường kẻ để nhận biết 3D (Còn nhiều kiểu hỗ trợ khác nữa)
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Thêm điều khiển quay cảnh bằng chuột với OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Giúp chuyển động mượt hơn
controls.dampingFactor = 0.25; // Điều chỉnh độ mượt

// Đảm bảo renderer cập nhật khi thay đổi kích thước cửa sổ
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );

