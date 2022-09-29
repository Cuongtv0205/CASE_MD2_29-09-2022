"use strict";
exports.__esModule = true;
var Account_1 = require("../model/Account");
var accountmanager_1 = require("../service/accountmanager");
var music_1 = require("../model/music");
var album_1 = require("../model/album");
var albumManager_1 = require("../service/albumManager");
var input = require('readline-sync');
var listAccount = new accountmanager_1.AccountManager();
var user = null;
var arrayAlbum = [];
var userCheck = null;
function menuAlbum() {
    var managerAlbumUser2;
    for (var i = 0; i < arrayAlbum.length; i++) {
        if (arrayAlbum[i].user == userCheck) {
            managerAlbumUser2 = arrayAlbum[i];
        }
    }
    var menu = "--Menu Album--\n\n                  ---1.Them Album---\n                  ---2.Xoa Album---\n                  ---3.Sua Album---\n                  ---4.Hien thi Album de tuong tac---\n                  ---5.Tim kiem theo ten Album---\n                  ---0.Thoat---";
    var choice;
    do {
        console.log(menu);
        choice = +input.question(' Nhap lua chon cua ban: ');
        switch (choice) {
            case 1:
                addAlbum(managerAlbumUser2);
                break;
            case 2:
                deleteAlbum(managerAlbumUser2);
                break;
            case 3:
                editAlbum(managerAlbumUser2);
                break;
            case 4:
                showAlbumUser(managerAlbumUser2);
                break;
            case 5:
                findNameAlbum(managerAlbumUser2);
                break;
            case 0:
                console.log(menu);
                break;
        }
    } while (choice != 0);
}
function findNameAlbum(managerAlbumUser2) {
    var name = input.question('Nhap ten album can tim:');
    if (name.length == 0) {
        console.log('Tu khoa khong duoc de trong!');
    }
    else {
        var flag = 0;
        for (var i = 0; i < managerAlbumUser2.listAlbum.length; i++) {
            if (managerAlbumUser2.listAlbum[i].name == name) {
                flag++;
                console.log("".concat(flag, ", Ten Album : ").concat(managerAlbumUser2.listAlbum[i].name));
            }
        }
        if (flag == 0) {
            console.log('--Ko co bh trong album can tim--');
        }
    }
}
function addAlbum(managerAlbumUser2) {
    console.log("--Them Album--");
    var name = input.question('Nhap ten album: ');
    var album = new album_1.Album(name);
    managerAlbumUser2.add(album);
}
function showAlbumUser(managerAlbumUser2) {
    console.log("--Chon Album--");
    if (managerAlbumUser2.listAlbum.length == 0) {
        console.log('ko co album de chon');
        menuAlbum();
    }
    for (var i = 0; i < managerAlbumUser2.listAlbum.length; i++) {
        console.log("Stt : ".concat(i + 1, ", Ten Album: ").concat(managerAlbumUser2.listAlbum[i].name));
    }
    var choiceAlbum = +input.question('Nhap so album ban muon chon: ');
    var menu = "--Menu BH trong Album--\n\n                  ---1.Them BH---\n                  ---2.Hien thi TT BH \u0111\u1EC3 t\u01B0\u01A1ng t\u00E1c---\n                  ---3.Tim kiem ten bai BH--\n                  ---0.Thoat---";
    var choice;
    do {
        console.log(menu);
        choice = +input.question('Nhap lua chon cua ban :');
        switch (choice) {
            case 1:
                addMusic(managerAlbumUser2, choiceAlbum);
                break;
            case 2:
                showMusic(managerAlbumUser2, choiceAlbum);
                break;
            case 3:
                findNameMusic(managerAlbumUser2, choiceAlbum);
                break;
            case 0:
                menuAlbum();
                break;
        }
    } while (choice != 0);
}
function deleteAlbum(managerAlbumUser2) {
    console.log("--Xoa Album--");
    if (managerAlbumUser2.listAlbum.length == 0) {
        console.log('Album khong co');
        menuAlbum();
    }
    var name = input.question('Nhap ten Album can xoa :');
    managerAlbumUser2["delete"](name);
    console.log("Ban da xoa Album : ".concat(name));
}
function editAlbum(managerAlbumUser2) {
    console.log("--Sua ten Album--");
    if (managerAlbumUser2.listAlbum.length == 0) {
        console.log('Ten Album sua khong duoc bo trong!');
        menuAlbum();
    }
    var name = input.question('Nhap ten album can sua:');
    if (managerAlbumUser2.findByIdAlbum(name) == -1) {
        console.log('Ko co');
    }
    else {
        var newName = input.question('Nhap ten album moi:');
        var newAlbum = new album_1.Album(newName);
        managerAlbumUser2.edit(name, newAlbum);
    }
}
function findNameMusic(managerAlbumUser2, choiceAlbum) {
    var name = input.question('Nhap ten bai hat can tim: ');
    if (name.length == 0) {
        console.log('Tên BH ko duoc de trong!');
    }
    else {
        var flat = 0;
        for (var i = 0; i < managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic.length; i++) {
            if (managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[i].name == name) {
                flat++;
                console.log("Ten BH: ".concat(managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[i].name));
            }
        }
        if (flat == 0) {
            console.log('Tên Bh ko co!');
        }
    }
}
function showMusic(managerAlbumUser2, choiceAlbum) {
    console.log("--TUONG TAC VOI BH--");
    if (managerAlbumUser2.listAlbum.length == 0) {
        console.log('KO CO BH');
    }
    if (managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic.length == 0) {
        console.log('KHONG CO BAI HAT');
        showAlbumUser(managerAlbumUser2);
    }
    for (var i = 0; i < managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic.length; i++) {
        console.log("STT BH : ".concat(i + 1, "\n                     Ten BH : ").concat(managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[i].name, "\n                     Ten ca si: ").concat(managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[i].singer, " \n                     Ten nhac si: ").concat(managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[i].composer));
    }
    var choiceMusic = +input.question('Nhap stt bai hat can dung:');
    var menu = "---Menu BH---\n\n                ---1.Sua---\n                ---2.Xoa---\n                ---0.Thoat---";
    var choice;
    do {
        console.log(menu);
        choice = +input.question('Nhap lua chon cua ban :');
        switch (choice) {
            case 1:
                editMusic(managerAlbumUser2, choiceAlbum, choiceMusic);
                break;
            case 2:
                deleteMusic(managerAlbumUser2, choiceAlbum, choiceMusic);
                break;
            case 0:
                menuAlbum();
                break;
        }
    } while (choice != 0);
}
function deleteMusic(managerAlbumUser2, choiceAlbum, choiceMusic) {
    console.log("--BH CAN XOA--");
    console.log("Da xoa BH: ".concat(managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[choiceMusic - 1].name));
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic.splice(choiceMusic - 1, 1);
    showAlbumUser(managerAlbumUser2);
}
function editMusic(managerAlbumUser2, choiceAlbum, choiceMusic) {
    console.log("--Menu Sua BH--");
    var newId = +input.question('Nhap id moi :');
    var newName = input.question('Nhap ten bh moi can them :');
    var newSinger = input.question('Nhap ca si moi : ');
    var newComposer = input.question('Nhap ten nhac si moi :');
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[choiceMusic - 1].id = newId;
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[choiceMusic - 1].name = newName;
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[choiceMusic - 1].singer = newSinger;
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[choiceMusic - 1].composer = newComposer;
    showAlbumUser(managerAlbumUser2);
}
function addMusic(managerAlbumUser2, choiceAlbum) {
    console.log("--Them BH--");
    var id = +input.question('Nhap id bai hat :');
    var name = input.question('Nhap ten bai hat :');
    var singer = input.question('Nhap ten ca si :');
    var composer = input.question('Nhap ten nhac si :');
    var newMusic = new music_1.Music(id, name, singer, composer);
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic.push(newMusic);
}
function mainAccount() {
    var menu = "--Menu \u0111\u0103ng k\u00FD v\u00E0 \u0111\u0103ng nh\u1EADp--\n\n                   ---1.\u0110\u0103ng k\u00FD---\n                   ---2.\u0110\u0103ng nh\u1EADp---\n                   ---3.Quay lai---\n                   ---0.Tho\u00E1t---";
    var choice;
    do {
        console.log(menu);
        choice = +input.question('Nhap lua chon cua ban :');
        switch (choice) {
            case 1:
                Register();
                break;
            case 2:
                Login();
                break;
            case 3:
                Login();
                break;
            case 0:
                console.log(menu);
                break;
        }
    } while (choice != 0);
}
function Register() {
    var menu = "--DANG KY--";
    console.log(menu);
    console.log("Ten user dk phai du 6 chu cai tro len");
    var username = input.question('Username :');
    var usernameRegex = /^([A-Za-z]){6,}$/;
    var testUser = usernameRegex.test(username);
    if (testUser == false) {
        console.log("\u0110\u0103ng k\u00FD th\u1EA5t b\u1EA1i!");
        Register();
    }
    else {
        console.log("User \u0111\u0103ng k\u00FD h\u1EE3p l\u1EC7!");
    }
    for (var i = 0; i < listAccount.listAccount.length; i++) {
        if (listAccount.listAccount[i].username == username) {
            console.log("--Username da ton tai,ban dk lai--");
            Register();
        }
    }
    console.log("mk du 3 chu so tro len");
    var password = input.question('Password :');
    var passwordRegex = /^([0-9]){3,}$/;
    var testPassword = passwordRegex.test(password);
    if (testPassword == false) {
        console.log("Ban nhap sai password!");
        Register();
    }
    var account = new Account_1.Account(username, password);
    listAccount.add(account);
    console.log('Bạn đăng ký thành công!');
    user = account;
    var managerAlbum = new albumManager_1.AlbumManager('', user);
    arrayAlbum.push(managerAlbum);
}
function Login() {
    var menu = "--DANG NHAP--";
    console.log(menu);
    var username = input.question('UserName :');
    if (username.length == 0) {
        console.log("---Ten user khong duoc de trong---");
    }
    var password = input.question('PassWord :');
    if (password.length == 0) {
        console.log("---Ten pass ko dc de trong---");
    }
    if (listAccount.findBy(username, password) == -1) {
        console.log('Bạn đăng nhập tài khoản thất bại');
        Register();
    }
    else {
        console.log('Bạn đăng nhập thành công');
        userCheck = listAccount.findAccount(username, password);
        menuAlbum();
    }
}
mainAccount();
