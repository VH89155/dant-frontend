import { Checkbox, Col, Row } from "antd";
import { useEffect, useState } from "react";


const TongGiaVe = (array, time,giaVe,moive) =>{
  console.log("moive", moive)
  let arrayVeChon = []
  console.log(time)
  time = new Date(time);
  let total = 0;
  if(moive.display_technology === "2D"){
    if( time.getDate()+1 >=6 || time.getDate() ===0){    
      array.map(item=>{
        if(item.startsWith("A") || item.startsWith("B")  || item.startsWith("C")|| item.startsWith("J")){
           let gia  ;
           let idVe;
           let nameVe;
           giaVe.map(item =>{
              if(item.name ==="Standard6-CN"){
                  gia = item.price_time
                  idVe = item._id
                  nameVe =item.name
                 
  
              }
           })
          
          if(time.getHours()+1 < 12){
            // total = total + 65000
            total = total + gia[0].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[0].price
  
            })
          }
          else if(time.getHours()+1 >=12 && time.getHours() +1<17){
            // total = total + 75000
            total = total +gia[1].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[1].price
  
            })
          }
          else if(time.getHours()+1 >=17 && time.getHours()+1<23){
            // total = total + 85000
            total = total +gia[2].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[2].price
  
            })
          }
          else if(time.getHours()+1 >=23){
            // total = total + 70000
            total = total +gia[3].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[3].price
  
            })
          }
        }
        else if(item.startsWith("D") || item.startsWith("E")  || item.startsWith("F")|| item.startsWith("G") || item.startsWith("H")|| item.startsWith("I")){
         
          let gia ;
          let idVe;
          let nameVe;
          giaVe.map(item =>{
             if(item.name ==="Vip6-CN"){
                 gia = item.price_time
                 idVe = item._id
                 nameVe = item.name
             }
          })
         
          if(time.getHours()+1 < 12){
            // total = total + 65000
            total = total + gia[0].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[0].price
  
            })
          }
          else if(time.getHours()+1 >=12 && time.getHours() +1<17){
            // total = total + 75000
            total = total +gia[1].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[1].price
  
            })
          }
          else if(time.getHours()+1 >=17 && time.getHours()+1<23){
            // total = total + 85000
            total = total +gia[2].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[2].price
  
            })
          }
          else if(time.getHours()+1 >=23){
            // total = total + 70000
            total = total +gia[3].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[3].price
  
            })
          }
        }
        else if(item.startsWith("K") ){
          let gia ;
         
          let idVe;
          let nameVe;
          giaVe.map(item =>{
             if(item.name ==="Swettbox6-CN"){
                 gia = item.price_time
                 idVe =item.idVe
                 nameVe = item.name
             }
          })
       
          if(time.getHours()+1 < 12){
            // total = total + 65000
            total = total + gia[0].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[0].price
  
            })
          }
          else if(time.getHours()+1 >=12 && time.getHours() +1<17){
            // total = total + 75000
            total = total +gia[1].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[1].price
  
            })
          }
          else if(time.getHours()+1 >=17 && time.getHours()+1<23){
            // total = total + 85000
            total = total +gia[2].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[2].price
  
            })
          }
          else if(time.getHours()+1 >=23){
            // total = total + 70000
            total = total +gia[3].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[3].price
  
            })
          }
        }
      
      })
      console.log(total)
      return {total: total, arrayVeChon: arrayVeChon}
    }
    if( time.getDate()+1 <6 || time.getDate() !==0){    
      array.map(item=>{
       
        if(item.startsWith("A") || item.startsWith("B")  || item.startsWith("C")|| item.startsWith("J")){
          let gia ; 
          let idVe;
          let nameVe;
          giaVe.map(item =>{
             if(item.name ==="Standard2-5"){
                 gia = item.price_time
                 idVe = item._id
                 nameVe=item.name
             }
          })
         
         if(time.getHours()+1 < 12){
           // total = total + 65000
           total = total + gia[0].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[0].price
  
          })
         }
         else if(time.getHours()+1 >=12 && time.getHours() +1<17){
           // total = total + 75000
           total = total +gia[1].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[1].price
  
          })
         }
         else if(time.getHours()+1 >=17 && time.getHours()+1<23){
           // total = total + 85000
           total = total +gia[2].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[2].price
  
          })
         }
         else if(time.getHours()+1 >=23){
           // total = total + 70000
           total = total +gia[3].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[3].price
  
          })
         }
       }
       else if(item.startsWith("D") || item.startsWith("E")  || item.startsWith("F")|| item.startsWith("G") || item.startsWith("H")|| item.startsWith("I")){
        
         let gia ;
         let idVe;
         let nameVe;
         giaVe.map(item =>{
            if(item.name ==="Vip2-5"){
                gia = item.price_time
                idVe = item._id
                nameVe = item.name
            }
         })
         // if(time.getHours()+1 < 12){
         //   total = total + 75000
         // }
         // else if(time.getHours()+1 >=12 && time.getHours() +1<17){
         //   total = total + 80000
         // }
         // else if(time.getHours()+1 >=17 && time.getHours()+1<23){
         //   total = total + 90000
         // }
         // else if(time.getHours()+1 >=23){
         //   total = total + 75000
         // }
         if(time.getHours()+1 < 12){
           // total = total + 65000
           total = total + gia[0].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[0].price
  
          })
         }
         else if(time.getHours()+1 >=12 && time.getHours() +1<17){
           // total = total + 75000
           total = total +gia[1].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[1].price
  
          })
         }
         else if(time.getHours()+1 >=17 && time.getHours()+1<23){
           // total = total + 85000
           total = total +gia[2].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[2].price
  
          })
         }
         else if(time.getHours()+1 >=23){
           // total = total + 70000
           total = total +gia[3].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[3].price
  
          })
         }
       }
       else if(item.startsWith("K") ){
         let gia ;
         let idVe;
         let nameVe;
         giaVe.map(item =>{
            if(item.name ==="Swettbox2-5"){
                gia = item.price_time
                idVe = item._id
                nameVe = item.name
            }
         })
       
         if(time.getHours()+1 < 12){
         
           total = total + gia[0].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[0].price
  
          })
         }
         else if(time.getHours()+1 >=12 && time.getHours() +1<17){
           // total = total + 75000
           total = total +gia[1].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[1].price
  
          })
         }
         else if(time.getHours()+1 >=17 && time.getHours()+1<23){
           // total = total + 85000
           total = total +gia[2].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[2].price
  
          })
         }
         else if(time.getHours()+1 >=23){
           // total = total + 70000
           total = total +gia[3].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[3].price
  
          })
         }
       }
      
      })
      console.log(total)
      console.log(arrayVeChon)
      return{ total:total, arrayVeChon:arrayVeChon}
    }
  }
  else if (moive.display_technology === "3D"){
    if( time.getDate()+1 >=6 || time.getDate() ===0){    
      array.map(item=>{
        if(item.startsWith("A") || item.startsWith("B")  || item.startsWith("C")|| item.startsWith("J")){
           let gia  ;
           let idVe;
           let nameVe;
           giaVe.map(item =>{
              if(item.name ==="Standard6-CN-3D"){
                  gia = item.price_time
                  idVe = item._id
                  nameVe =item.name
                 
  
              }
           })
          
          if(time.getHours()+1 < 12){
            // total = total + 65000
            total = total + gia[0].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[0].price
  
            })
          }
          else if(time.getHours()+1 >=12 && time.getHours() +1<17){
            // total = total + 75000
            total = total +gia[1].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[1].price
  
            })
          }
          else if(time.getHours()+1 >=17 && time.getHours()+1<23){
            // total = total + 85000
            total = total +gia[2].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[2].price
  
            })
          }
          else if(time.getHours()+1 >=23){
            // total = total + 70000
            total = total +gia[3].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[3].price
  
            })
          }
        }
        else if(item.startsWith("D") || item.startsWith("E")  || item.startsWith("F")|| item.startsWith("G") || item.startsWith("H")|| item.startsWith("I")){
         
          let gia ;
          let idVe;
          let nameVe;
          giaVe.map(item =>{
             if(item.name ==="Vip6-CN-3D"){
                 gia = item.price_time
                 idVe = item._id
                 nameVe = item.name
             }
          })
         
          if(time.getHours()+1 < 12){
            // total = total + 65000
            total = total + gia[0].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[0].price
  
            })
          }
          else if(time.getHours()+1 >=12 && time.getHours() +1<17){
            // total = total + 75000
            total = total +gia[1].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[1].price
  
            })
          }
          else if(time.getHours()+1 >=17 && time.getHours()+1<23){
            // total = total + 85000
            total = total +gia[2].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[2].price
  
            })
          }
          else if(time.getHours()+1 >=23){
            // total = total + 70000
            total = total +gia[3].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[3].price
  
            })
          }
        }
        else if(item.startsWith("K") ){
          let gia ;
         
          let idVe;
          let nameVe;
          giaVe.map(item =>{
             if(item.name ==="Sweetbox6-CN-3D"){
                 gia = item.price_time
                 idVe =item.idVe
                 nameVe = item.name
             }
          })
       
          if(time.getHours()+1 < 12){
            // total = total + 65000
            total = total + gia[0].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[0].price
  
            })
          }
          else if(time.getHours()+1 >=12 && time.getHours() +1<17){
            // total = total + 75000
            total = total +gia[1].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[1].price
  
            })
          }
          else if(time.getHours()+1 >=17 && time.getHours()+1<23){
            // total = total + 85000
            total = total +gia[2].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[2].price
  
            })
          }
          else if(time.getHours()+1 >=23){
            // total = total + 70000
            total = total +gia[3].price
            arrayVeChon.push({
              _id: idVe,
              name:nameVe,
              price:gia[3].price
  
            })
          }
        }
      
      })
      console.log(total)
      return {total: total, arrayVeChon: arrayVeChon}
    }
    if( time.getDate()+1 <6 || time.getDate() !==0){    
      array.map(item=>{
       
        if(item.startsWith("A") || item.startsWith("B")  || item.startsWith("C")|| item.startsWith("J")){
          let gia ; 
          let idVe;
          let nameVe;
          giaVe.map(item =>{
             if(item.name ==="Standard2-5-3D"){
                 gia = item.price_time
                 idVe = item._id
                 nameVe=item.name
             }
          })
         
         if(time.getHours()+1 < 12){
           // total = total + 65000
           total = total + gia[0].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[0].price
  
          })
         }
         else if(time.getHours()+1 >=12 && time.getHours() +1<17){
           // total = total + 75000
           total = total +gia[1].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[1].price
  
          })
         }
         else if(time.getHours()+1 >=17 && time.getHours()+1<23){
           // total = total + 85000
           total = total +gia[2].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[2].price
  
          })
         }
         else if(time.getHours()+1 >=23){
           // total = total + 70000
           total = total +gia[3].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[3].price
  
          })
         }
       }
       else if(item.startsWith("D") || item.startsWith("E")  || item.startsWith("F")|| item.startsWith("G") || item.startsWith("H")|| item.startsWith("I")){
        
         let gia ;
         let idVe;
         let nameVe;
         giaVe.map(item =>{
            if(item.name ==="Vip2-5-3D"){
                gia = item.price_time
                idVe = item._id
                nameVe = item.name
            }
         })
         // if(time.getHours()+1 < 12){
         //   total = total + 75000
         // }
         // else if(time.getHours()+1 >=12 && time.getHours() +1<17){
         //   total = total + 80000
         // }
         // else if(time.getHours()+1 >=17 && time.getHours()+1<23){
         //   total = total + 90000
         // }
         // else if(time.getHours()+1 >=23){
         //   total = total + 75000
         // }
         if(time.getHours()+1 < 12){
           // total = total + 65000
           total = total + gia[0].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[0].price
  
          })
         }
         else if(time.getHours()+1 >=12 && time.getHours() +1<17){
           // total = total + 75000
           total = total +gia[1].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[1].price
  
          })
         }
         else if(time.getHours()+1 >=17 && time.getHours()+1<23){
           // total = total + 85000
           total = total +gia[2].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[2].price
  
          })
         }
         else if(time.getHours()+1 >=23){
           // total = total + 70000
           total = total +gia[3].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[3].price
  
          })
         }
       }
       else if(item.startsWith("K") ){
         let gia ;
         let idVe;
         let nameVe;
         giaVe.map(item =>{
            if(item.name ==="Sweetbox2-5-3D"){
                gia = item.price_time
                idVe = item._id
                nameVe = item.name
            }
         })
       
         if(time.getHours()+1 < 12){
         
           total = total + gia[0].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[0].price
  
          })
         }
         else if(time.getHours()+1 >=12 && time.getHours() +1<17){
           // total = total + 75000
           total = total +gia[1].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[1].price
  
          })
         }
         else if(time.getHours()+1 >=17 && time.getHours()+1<23){
           // total = total + 85000
           total = total +gia[2].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[2].price
  
          })
         }
         else if(time.getHours()+1 >=23){
           // total = total + 70000
           total = total +gia[3].price
           arrayVeChon.push({
            _id: idVe,
            name:nameVe,
            price:gia[3].price
  
          })
         }
       }
      
      })
      console.log(total)
      console.log(arrayVeChon)
      return{ total:total, arrayVeChon:arrayVeChon}
    }
  }
 

}

const Check_ghe = (props) => {
  const {giaVe, setChonVe,chonVe,moive} = props
  // console.log("moive", moive)
  let A = [];let B = [];let C = [];let D = [];let E = [];let F= [];
  let K = [];let G = [];let H = [];let I = [] ;let J = [];
  for(let i=0;i<13;i++){
    console.log("gia Ve", giaVe)
   A.push({value: `A${i+1}`,label: i+1,status: false,check: false})
   B.push({value: `B${i+1}`,label: i+1,status: false,check: false})
   C.push({value: `C${i+1}`,label: i+1,status: false,check: false})
   D.push({value: `D${i+1}`,label: i+1,status: false,check: false})
   E.push({value: `E${i+1}`,label: i+1,status: false,check: false})
   F.push({value: `F${i+1}`,label: i+1,status: false,check: false})
   G.push({value: `G${i+1}`,label: i+1,status: false,check: false})
   H.push({value: `H${i+1}`,label: i+1,status: false,check: false})
   I.push({value: `I${i+1}`,label: i+1,status: false,check: false})
   J.push({value: `J${i+1}`,label: i+1,status: false,check: false})
   K.push({value: `K${i+1}`,label: i+1,status: false,check: false})
  }
    const {Chon_ghe,setChon_ghe,SelectedChair,time,setTong} =props;
    SelectedChair.map((item)=>{
      A.map((a)=>{
        if(a.value === item) return a.status =true;
      })
      B.map((a)=>{
        if(a.value === item) return a.status =true;
      })
      C.map((a)=>{
        if(a.value === item) return a.status =true;
      })
      D.map((a)=>{
        if(a.value === item) return a.status =true;
      })
      E.map((a)=>{
        if(a.value === item) return a.status =true;
      })
      F.map((a)=>{
        if(a.value === item) return a.status =true;
      })
      G.map((a)=>{
        if(a.value === item) return a.status =true;
      })
      H.map((a)=>{
       if(a.value === item) return a.status =true;
      })
      I.map((a)=>{
        if(a.value === item) return a.status =true;
      })
      J.map((a)=>{
        if(a.value === item) return a.status =true;
      })
      K.map((a)=>{
        if(a.value === item) return a.status =true;
      })
    })
    Chon_ghe.map(item=>{
      A.map((a)=>{
        if(a.value === item) return a.check =true;
      })
      B.map((a)=>{
        if(a.value === item) return a.check =true;
      })
      C.map((a)=>{
        if(a.value === item) return a.check =true;
      })
      D.map((a)=>{
        if(a.value === item) return a.check =true;
      })
      E.map((a)=>{
        if(a.value === item) return a.check =true;
      })
      F.map((a)=>{
        if(a.value === item) return a.check =true;
      })
      G.map((a)=>{
        if(a.value === item) return a.check =true;
      })
      H.map((a)=>{
       if(a.value === item) return a.check =true;
      })
      I.map((a)=>{
        if(a.value === item) return a.check =true;
      })
      J.map((a)=>{
        if(a.value === item) return a.check =true;
      })
      K.map((a)=>{
        if(a.value === item) return a.check =true;
      })
    })
//    A[0].status =true
//    A[2].check = true
//    B[3].status = true
   
   const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setChon_ghe(checkedValues)
    const {total, arrayVeChon} = {...TongGiaVe(checkedValues,time,giaVe,moive)}
    setTong(total);
    setChonVe(arrayVeChon)  
  
     }
   useEffect(()=>{
    console.log(Chon_ghe)
    console.log(chonVe)
   
   },[A,B,C,D,E,F,G,H,I,J,K,Chon_ghe,SelectedChair])

  return (
    <>
      <Checkbox.Group
        style={{
          marginTop: "40px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onChange={onChange}
      >
        <div className="line-ghe">
          <p className="tx-lf">A</p>
          <ul>
            {A?.map((item,index)=>{
                let url ="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000194_Gh%e1%ba%bf thường.jpg";
              
                if(item.check){
                    url="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
                }
                else if(!item.status && !item.check){
                    url = "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000194_Gh%e1%ba%bf thường.jpg"
                }
                else if(item.status && !item.check){
                    url= "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
                }
                const Click = ()=>{
                    item.check = !item.check               
                    
                }
                return(
                    <Checkbox value={item.value} onClick={Click} disabled={item.status} className="check_box" key={item+index}>
                   
                    <img
                      className="img-check"
                      style={{ width: 25, height: 22 }}
                     
                      src={url}
                      alt="Ghe thuong"
                    ></img>{" "}
                    <span className="number-ghe">{item.label}</span>
                  </Checkbox>
                )
            })}
           
            
          </ul>
          <p className="tx-lf">A</p>
        </div>

        <div className="line-ghe">
          <p className="tx-lf">B</p>
          <ul>
            {B.map((item,index)=>{
                
                let url =""
                if(item.check){
                    url="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
                }
                else if(!item.status && !item.check){
                    url = "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000194_Gh%e1%ba%bf thường.jpg"
                }
                else if(item.status && !item.check){
                    url= "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
                }
                
                const Click = ()=>{
                    item.check = !item.check               
                    
                }
                return(
                    <Checkbox value={item.value} onClick={Click} disabled={item.status} className="check_box" key={item+index}>
                   
                    <img
                      className="img-check"
                      style={{ width: 25, height: 22 }}
                     src={url}
                      alt="Ghe thuong"
                    ></img>{" "}
                    <span className="number-ghe">{` ${item.label}`}</span>
                  </Checkbox>
                )
            })}
           
            
          </ul>
          <p className="tx-lf">B</p>
        </div>
        <div className="line-ghe">
          <p className="tx-lf">C</p>
          <ul>
            {C.map((item,index)=>{
             let url =""
             if(item.check){
                 url="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
             }
             else if(!item.status && !item.check){
                 url = "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000194_Gh%e1%ba%bf thường.jpg"
             }
             else if(item.status && !item.check){
                 url= "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
             }
             
             const Click = ()=>{
                item.check = !item.check               
                
            }
            return(
                <Checkbox value={item.value} onClick={Click} disabled={item.status} className="check_box" key={item+index}>
               
                 <img
                   className="img-check"
                   style={{ width: 25, height: 22 }}
                  src={url}
                   alt="Ghe thuong"
                 ></img>{" "}
                 <span className="number-ghe">{item.label}</span>
               </Checkbox>
             )
         })}
            
          </ul>
          <p className="tx-lf">C</p>
        </div>
        <div className="line-ghe">
          <p className="tx-lf">D</p>
          <ul>
            {D.map((item,index)=>{
              let url =""
              if(item.check){
                  url="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
              }
              else if(!item.status && !item.check){
                  url =  "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000193_ghe-vip.jpg"
              }
              else if(item.status && !item.check){
                  url= "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
              }
              
              const Click = ()=>{
                item.check = !item.check               
                
            }
            return(
                <Checkbox value={item.value} onClick={Click} disabled={item.status} className="check_box" key={item+index}>
               
                  <img
                    className="img-check"
                    style={{ width: 25, height: 22 }}
                   src={url}
                    alt="Ghe thuong"
                  ></img>{" "}
                  <span className="number-ghe">{item.label}</span>
                </Checkbox>
              )
          })}
           
            
          </ul>
          <p className="tx-lf">D</p>
        </div>
        <div className="line-ghe">
          <p className="tx-lf">E</p>
          <ul>
            {E.map((item,index)=>{
                
                let url =""
                if(item.check){
                    url="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
                }
                else if(!item.status && !item.check){
                    url =  "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000193_ghe-vip.jpg"
                }
                else if(item.status && !item.check){
                    url= "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
                }
                const Click = ()=>{
                    item.check = !item.check               
                    
                }
                return(
                    <Checkbox value={item.value} onClick={Click} disabled={item.status} className="check_box" key={item+index}>
                   
                    <img
                      className="img-check"
                      style={{ width: 25, height: 22 }}
                     src={url}
                      alt="Ghe thuong"
                    ></img>{" "}
                    <span className="number-ghe">{item.label}</span>
                  </Checkbox>
                )
            })}
           
            
          </ul>
          <p className="tx-lf">E</p>
        </div>
        <div className="line-ghe">
          <p className="tx-lf">F</p>
          <ul>
            {F.map((item,index)=>{
               let url =""
               if(item.check){
                   url="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
               }
               else if(!item.status && !item.check){
                   url =  "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000193_ghe-vip.jpg"
               }
               else if(item.status && !item.check){
                   url= "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
               }
               const Click = ()=>{
                item.check = !item.check               
                
            }
            return(
                <Checkbox value={item.value} onClick={Click} disabled={item.status} className="check_box" key={item+index}>
               
                   <img
                     className="img-check"
                     style={{ width: 25, height: 22 }}
                    src={url}
                     alt="Ghe thuong"
                   ></img>{" "}
                   <span className="number-ghe">{item.label}</span>
                 </Checkbox>
               )
           })}
            
          </ul>
          <p className="tx-lf">F</p>
        </div>
        <div className="line-ghe">
          <p className="tx-lf">G</p>
          <ul>
            {G.map((item,index)=>{
                
                let url =""
              if(item.check){
                  url="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
              }
              else if(!item.status && !item.check){
                  url =  "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000193_ghe-vip.jpg"
              }
              else if(item.status && !item.check){
                  url= "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
              }
              
                 const Click = ()=>{
                item.check = !item.check               
                
            }
            return(
                <Checkbox value={item.value} onClick={Click} disabled={item.status} className="check_box" key={item+index}>
               
                  <img
                    className="img-check"
                    style={{ width: 25, height: 22 }}
                   src={url}
                    alt="Ghe thuong"
                  ></img>{" "}
                  <span className="number-ghe">{item.label}</span>
                </Checkbox>
              )
          })}
           
            
          </ul>
          <p className="tx-lf">G</p>
        </div>
        <div className="line-ghe">
          <p className="tx-lf">H</p>
          <ul>
            {H.map((item,index)=>{
                
                let url =""
                if(item.check){
                    url="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
                }
                else if(!item.status && !item.check){
                    url =  "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000193_ghe-vip.jpg"
                }
                else if(item.status && !item.check){
                    url= "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
                }
                
                const Click = ()=>{
                    item.check = !item.check               
                    
                }
                return(
                    <Checkbox value={item.value} onClick={Click} disabled={item.status} className="check_box" key={item+index}>
                   
                    <img
                      className="img-check"
                      style={{ width: 25, height: 22 }}
                     src={url}
                      alt="Ghe thuong"
                    ></img>{" "}
                    <span className="number-ghe">{item.label}</span>
                  </Checkbox>
                )
            })}
            
          </ul>
          <p className="tx-lf">H</p>
        </div>
        <div className="line-ghe">
          <p className="tx-lf">I</p>
          <ul>
            {I.map((item,index)=>{
               let url =""
               if(item.check){
                   url="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
               }
               else if(!item.status && !item.check){
                   url =  "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000193_ghe-vip.jpg"
               }
               else if(item.status && !item.check){
                   url= "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
               }
               
               const Click = ()=>{
                item.check = !item.check               
                
            }
            return(
                <Checkbox value={item.value} onClick={Click} disabled={item.status} className="check_box" key={item+index}>
               
                   <img
                     className="img-check"
                     style={{ width: 25, height: 22 }}
                    src={url}
                     alt="Ghe thuong"
                   ></img>{" "}
                   <span className="number-ghe">{item.label}</span>
                 </Checkbox>
               )
           })}
            
          </ul>
          <p className="tx-lf">I</p>
        </div>
        <div className="line-ghe">
          <p className="tx-lf">J</p>
          <ul>
            {J.map((item,index)=>{
                
                let url =""
               if(item.check){
                   url="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
               }
               else if(!item.status && !item.check){
                   url = "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000194_Gh%e1%ba%bf thường.jpg"
               }
               else if(item.status && !item.check){
                   url= "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
               }
               const Click = ()=>{
                item.check = !item.check               
                
            }
            return(
                <Checkbox value={item.value} onClick={Click} disabled={item.status} className="check_box" key={item+index}>
               
                   <img
                     className="img-check"
                     style={{ width: 25, height: 22 }}
                    src={url}
                     alt="Ghe thuong"
                   ></img>{" "}
                   <span className="number-ghe">{item.label}</span>
                 </Checkbox>
               )
           })}
            
          </ul>
          <p className="tx-lf">J</p>
        </div>
        <div className="line-ghe">
          <p className="tx-lf">K</p>
          <ul>
            {K.map((item,index)=>{
                
                let url =""
                if(item.check){
                    url="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_active.png"
                }
                else if(!item.status && !item.check){
                    url =   "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/0000284_ghe-doi.jpg"
                }
                else if(item.status && !item.check){
                    url= "https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/images/seat_lock.png"
                }
                
                const Click = ()=>{
                    item.check = !item.check               
                    
                }
                return(
                    <Checkbox value={item.value} onClick={Click} disabled={item.status} className="check_box" key={item+index}>
                   
                    <img
                      className="img-check"
                      style={{ width: 25, height: 22 }}
                     src={url}
                      alt="Ghe thuong"
                    ></img>{" "}
                    <span className="number-ghe">{item.label}</span>
                  </Checkbox>
                )
            })}
            
          </ul>
          <p className="tx-lf">K</p>
        </div>
        
      </Checkbox.Group>
    </>
  );
};

export default Check_ghe;
