function alter(key){
    if(key===`a`){
        $(`.register-overlay`).css(`transform`,`translateX(-100%)`)
        $(`.register-form-container`).css(`transform`,`translateX(-100%)`)
        $(`.login-form-container`).css(`transform`,`translateX(-100%)`)
        $(`.register-left`).css(`background-position`,`center right`)
        $(`.register-left`).css(`transform`,`translateX(-30%)`)
        $(`.register-right`).css(`transform`,`translateX(0)`)
        $(`.register-right`).css(`background-position`,`center right`)
        
    } else {
        $(`.register-overlay`).css(`transform`,`translateX(0)`)
        $(`.register-form-container`).css(`transform`,`translateX(0)`)
        $(`.login-form-container`).css(`transform`,`translateX(0)`)
        $(`.register-left`).css(`background-position`,`center left`)
        $(`.register-left`).css(`transform`,`translateX(0)`)
        $(`.register-right`).css(`transform`,`translateX(30%)`)
        $(`.register-right`).css(`background-position`,`center left`)        
    }
}