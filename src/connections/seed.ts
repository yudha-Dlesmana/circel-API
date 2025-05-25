import {connection} from "./prismaClient";
import {hash} from "bcrypt";

async function main(){
  // clear data
  await connection.user.deleteMany();
  await connection.tweet.deleteMany();

  // add user
  await connection.user.createMany({
    data:[
      {fullname: "yudha dwi lesmana", email: "yudha.dlesmana@gmail.com", username: "@yudhadlesmana", password: await hash("YuDha12.03", 10), role: "ADMIN"},
    ]
  });  
}

main().then(()=>{
  console.log("Success seeding data!")
})
.catch((e)=>{
  console.error("Error seeding data:", e)
  process.exit(1)
})
.finally(async ()=>{
  await connection.$disconnect()
})