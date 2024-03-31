import axios from "axios";

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const instance = axios.create({
    baseURL: 'https://localhost:7114',
    headers: {
      'Content-Type': 'application/json', // Header mặc định cho tất cả các request
        // timeout: 10000,
      'Authorization':localStorage.getItem('token'),
    },
  });
  
// Phương thức GET
function getAPI(endpoint) {
    return instance.get(endpoint);
}

// Phương thức POST
function postAPI(endpoint, params) {
    return instance.post(endpoint, params);
}
// Phương thức PUT
function putAPI(endpoint, data) {
    return instance.put(endpoint, data);
}
  
// Phương thức DELETE
function deleteAPI(endpoint) {
    return instance.delete(endpoint);
}
function login(data){
    return instance.post("/AuthenticateController/login",data)
}
function getAllAnalysisContent(){
    return instance.get("/AnalysisContent/get-all")
}
function InsertExam(data){
    return instance.post("/Exams/exam-detail/", data);
}
function InsertUser(data){
    return instance.post("/User/create-user",data);
}

function Exams(param){
    // return instance.post("/Exams/get-all", param);
    return new Promise((resolve, reject) => {
        // fake danh sách đề thi
        let rs = [
            {ID: 261, Name: "Đề thi giữa kì I, Năm học 2023-2024"},
            {ID: 262, Name: "Đề thi cuối kì I, Năm học 2023-2024"},
            {ID: 263, Name: "Đề thi giữa kì II, Năm học 2023-2024"},
            {ID: 264, Name: "Đề thi cuối kì II, Năm học 2023-2024"},
        ]
        resolve(rs);
    })
}
function ExamsByID(param){
    return new Promise((resolve, reject) => {
        // fake danh sách câu hỏi
        let tmp = [
            {
                Q: 'Khi có một lực tác động lên vật thì vận tốc của vật sẽ như thế nào?',
                A: ['Vận tốc không thay đổi',
                    'Vận tốc giảm dần',
                    'Vận tốc có thể tăng có thể giảm',
                    'Vận tốc tăng dần'],
                T: 1
            },
            {
                Q: 'Một quyển vở có khối lượng 800g thì có trọng lượng là bao nhiêu Niutơn?',
                A: ['0,08N',
                    '8N',
                    '80N',
                    '0.8N'],
                T: 2
            },
            {
                Q: 'Lực nào sau đây là lực đàn hồi?',
                A: ['Lực đẩy của lò xo dưới yên xe đạp',
                    'Trọng lượng của một quả nặng',
                    'Lực hút của một nam châm tác động lên miếng sắt',
                    'Lực kéo của hai đội kéo co'],
                T: 1
            },
            {
                Q: 'Vật nào sau đây là nguồn sáng?',
                A: ['Ngôi nhà',
                    'Trái đất',
                    'Khúc gỗ',
                    'Mặt trời'],
                T: 4
            },
            {
                Q: 'Ảnh của một vật tạo bởi gương cầu lồi có đặc điểm?',
                A: ['Ảnh ảo to bằng vật',
                    'Ảnh thật nhỏ hơn vật',
                    'Ảnh ảo nhỏ hơn vật',
                    'Ảnh ảo lớn hơn vật'],
                T: 3
            },
        ]

        let rs = [];
        tmp.forEach(item => {
            let answers = []
            item.A.forEach((text, id) => {
                answers.push({
                    text: `<p>${text}</p>`,
                    isTrue: id == item.T - 1
                })
            })
            rs.push({
                question: `<p>${item.Q}</p>`,
                answers: answers
            })
        })
        resolve(rs);
    })
}
export default {login,getAllAnalysisContent,InsertExam,InsertUser, Exams, ExamsByID};