import {Account} from "../model/Account";
import {AccountManager} from "../service/accountmanager";
import {Music} from "../model/music";
import {Album} from "../model/album";
import {AlbumManager} from "../service/albumManager";
import {createDiffieHellman} from "crypto";
import test from "node:test";

let input = require('readline-sync');
let listAccount: AccountManager = new AccountManager()
let user: Account = null;
let arrayAlbum: AlbumManager[] = [];
let userCheck: Account = null;

function menuAlbum() {
    let managerAlbumUser2: AlbumManager;
    for (let i = 0; i < arrayAlbum.length; i++) {
        if (arrayAlbum[i].user == userCheck) {
            managerAlbumUser2 = arrayAlbum[i]
        }
    }
    let menu = `--Menu Album--\n
                  ---1.Them Album---
                  ---2.Xoa Album---
                  ---3.Sua Album---
                  ---4.Hien thi Album de tuong tac---
                  ---5.Tim kiem theo ten Album---
                  ---0.Thoat---`
    let choice;
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
                findNameAlbum(managerAlbumUser2)
                break;
            case 0:
                console.log(menu);
                break;

        }
    } while (choice != 0)
}

function findNameAlbum(managerAlbumUser2: AlbumManager) {
    let name = input.question('Nhap ten album can tim:')
    if (name.length == 0) {
        console.log('Từ khóa không được để trống!')
    } else {
        let flag = 0;
        for (let i = 0; i < managerAlbumUser2.listAlbum.length; i++) {
            if (managerAlbumUser2.listAlbum[i].name == name) {
                    flag++;
                    console.log(`${flag}, Ten Album : ${managerAlbumUser2.listAlbum[i].name}`)

            }
        }
        if (flag == 0) {
            console.log('--Ko co bh trong album can tim--')
        }
    }
}

function addAlbum(managerAlbumUser2: AlbumManager) {
    console.log(`--Them Album--`)
    let name = input.question('Nhap ten album: ')
    let album: Album = new Album(name);
    managerAlbumUser2.add(album);
}

function showAlbumUser(managerAlbumUser2: AlbumManager) {
    console.log(`--Chon Album--`);
    if (managerAlbumUser2.listAlbum.length == 0) {
        console.log('ko co album de chon');
        menuAlbum();
    }
    for (let i = 0; i < managerAlbumUser2.listAlbum.length; i++) {
        console.log(`Stt : ${i + 1}, Ten Album: ${managerAlbumUser2.listAlbum[i].name}`)
    }
    let choiceAlbum = +input.question('Nhap so album ban muon chon: ');
    let menu = `--Menu BH trong Album--\n
                  ---1.Them BH---
                  ---2.Hien thi TT BH để tương tác---
                  ---3.Tim kiem ten bai BH--
                  ---0.Thoat---`;
    let choice;
    do {
        console.log(menu);
        choice = +input.question('Nhap lua chon cua ban :');
        switch (choice) {
            case 1:
                addMusic(managerAlbumUser2, choiceAlbum)
                break;
            case 2:
                showMusic(managerAlbumUser2, choiceAlbum);
                break;
            case 3:
                findNameMusic(managerAlbumUser2, choiceAlbum)
                break;
            case 0:
                menuAlbum();
                break;
        }
    } while (choice != 0)
}

function deleteAlbum(managerAlbumUser2: AlbumManager) {
    console.log(`--Xoa Album--`);
    if (managerAlbumUser2.listAlbum.length == 0) {
        console.log('Album khong co');
        menuAlbum();
    }
    let name = input.question('Nhap ten Album can xoa :')
    managerAlbumUser2.delete(name);
    console.log(`Ban da xoa Album : ${name}`)
}

function editAlbum(managerAlbumUser2: AlbumManager) {
    console.log(`--Sua ten Album--`)
    if (managerAlbumUser2.listAlbum.length == 0) {
        console.log('Ten Album sửa không được bỏ trống!');
        menuAlbum();
    }
    let name = input.question('Nhap ten album can sua:');
    if (managerAlbumUser2.findByIdAlbum(name) == -1) {
        console.log('Ko co');
    } else {
        let newName = input.question('Nhap ten album moi:')
        let newAlbum = new Album(newName);
        managerAlbumUser2.edit(name, newAlbum);
    }
}


function findNameMusic(managerAlbumUser2: AlbumManager, choiceAlbum) {
    let name = input.question('Nhap ten bai hat can tim: ');
    if (name.length == 0) {
        console.log('Tên BH không được để trống!')
    } else {
        let flat = 0;
        for (let i = 0; i < managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic.length; i++) {
            if (managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[i].name == name) {
                    flat++;
                    console.log(`Ten BH: ${managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[i].name}`)
            }
        }
        if (flat == 0) {
            console.log('Tên Bh ko có!');
        }
    }
}


function showMusic(managerAlbumUser2: AlbumManager, choiceAlbum) {
    console.log(`--TUONG TAC VOI BH--`)
    if (managerAlbumUser2.listAlbum.length == 0) {
        console.log('KO CO BH')
    }
    if (managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic.length == 0) {
        console.log('KHONG CO BAI HAT');
        showAlbumUser(managerAlbumUser2);
    }
    for (let i = 0; i < managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic.length; i++) {
        console.log(`STT BH : ${i + 1}
                     Ten BH : ${managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[i].name}
                     Ten ca si: ${managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[i].singer} 
                     Ten nhac si: ${managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[i].composer}`)
    }
    let choiceMusic = +input.question('Nhap stt bai hat can dung:')
    let menu = `---Menu BH---\n
                ---1.Sua---
                ---2.Xoa---
                ---0.Thoat---`
    let choice;
    do {
        console.log(menu);
        choice = +input.question('Nhap lua chon cua ban :');
        switch (choice) {
            case 1:
                editMusic(managerAlbumUser2, choiceAlbum, choiceMusic);
                break;
            case 2:
                deleteMusic(managerAlbumUser2, choiceAlbum, choiceMusic)
                break;
            case 0:
                menuAlbum();
                break;
        }

    } while (choice != 0)
}


function deleteMusic(managerAlbumUser2: AlbumManager, choiceAlbum, choiceMusic) {
    console.log(`--BH CAN XOA--`)
    console.log(`Da xoa BH: ${managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[choiceMusic - 1].name}`);
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic.splice(choiceMusic - 1, 1)
    showAlbumUser(managerAlbumUser2);
}

function editMusic(managerAlbumUser2: AlbumManager, choiceAlbum, choiceMusic) {
    console.log(`--Menu Sua BH--`)
    let newId = +input.question('Nhap id moi :')
    let newName = input.question('Nhap ten bh moi can them :');
    let newSinger = input.question('Nhap ca si moi : ');
    let newComposer = input.question('Nhap ten nhac si moi :');
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[choiceMusic - 1].id = newId;
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[choiceMusic - 1].name = newName;
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[choiceMusic - 1].singer = newSinger;
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic[choiceMusic - 1].composer = newComposer;
    showAlbumUser(managerAlbumUser2);
}

function addMusic(managerAlbumUser2: AlbumManager, choiceAlbum) {
    console.log(`--Them BH--`)
    let id = +input.question('Nhap id bai hat :');
    let name = input.question('Nhap ten bai hat :');
    let singer = input.question('Nhap ten ca si :');
    let composer = input.question('Nhap ten nhac si :');
    let newMusic = new Music(id, name, singer, composer);
    managerAlbumUser2.listAlbum[choiceAlbum - 1].listMusic.push(newMusic);
}

function mainAccount() {
    let menu = `--Menu đăng ký và đăng nhập--\n
                   ---1.Đăng ký---
                   ---2.Đăng nhập---
                   ---0.Thoát---`
    let choice;
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
            case 0:
                console.log(menu);
                break;
        }
    } while (choice != 0)
}

function Register() {
    let menu = `--DANG KY--`
    console.log(menu);
    console.log(`Ten user dk phai du 6 chu cai tro len`)
    let username = input.question('Username :');
    let usernameRegex = /^([A-Za-z]){6,}$/;
    let testUser = usernameRegex.test(username);
    if (testUser == false) {
        console.log(`Đăng ký thất bại!`);
       Register();
    }else {
        console.log(`User đăng ký hợp lệ!`)
    }
    for (let i = 0; i < listAccount.listAccount.length; i++) {
        if (listAccount.listAccount[i].username == username) {
            console.log(`--Username da ton tai,ban dk lai--`);
            Register();
        }
    }
    console.log(`mk du 3 chu so tro len`)
    let password = input.question('Password :');
    let passwordRegex =  /^([0-9]){3,}$/
    let testPassword = passwordRegex.test(password);
    if (testPassword==false){
        console.log(`Ban nhap sai password!`);
        Register();
    }
    let account: Account = new Account(username, password);
    listAccount.add(account)
    console.log('Bạn đăng ký thành công!')
    user = account
    let managerAlbum = new AlbumManager('', user);
    arrayAlbum.push(managerAlbum);
}

function Login() {
    let menu = `--DANG NHAP--`
    console.log(menu);

    let username = input.question('UserName :');
    let password = input.question('PassWord :');

    if (listAccount.findBy(username, password) == -1) {
        console.log('Bạn đăng nhập tài khoản thất bại');
        Login();
    } else {
        console.log('Bạn đăng nhập thành công')
        userCheck = listAccount.findAccount(username, password);
        menuAlbum();
    }
}

mainAccount();