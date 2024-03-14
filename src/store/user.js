//定义store
import { defineStore } from "pinia";

export default  defineStore("userInfo", {
  state: () => {
    return {
      token: sessionStorage.getItem("Token-Key") || null,
      menuStatus:false,
    };
  },
  actions: {
    changeMenuStatus(){
      this.menuStatus=!this.menuStatus
    }
  },
  getters:{
    setMenuStatus(){
      return this.menuStatus
    }
  }
});
