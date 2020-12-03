import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { giftApi } from "../../apiClient/ApiClient";
import { GiftType, UserType } from "../common/types";


export function useNoteBook() {
  const [giftsByPerson, setGiftsByPerson] = useState({} as {[member: string] : GiftType[]} );

  const user = useSelector((state: any) => state.user as UserType)
  
  useEffect(() => {
    giftApi.getAllGifts(user?.token).then(gifts => {
      setGiftsByPerson(gifts)
    });
  }, [user]);

  async function createGift(newGift: GiftType) {
    if (newGift.name) {
      const memberGifts = giftsByPerson && giftsByPerson[user.username] ? giftsByPerson[user.username] : []

      if (user.token)
      {
        const res = await giftApi.createGift(newGift, user.token);
        if (res.success)
        {
          const gift = {...newGift, id: res.message.gifts.insertedIds[0]}
          setGiftsByPerson({...giftsByPerson, [user.username]: [gift, ...memberGifts]});
        }
      }
    }
  }

  async function updateGift(updatedGift: GiftType) {
    
    if (updatedGift.name){
      const newGifts = giftsByPerson[user.username].map(gift => gift.id === updatedGift.id ? updatedGift: gift);
    
    setGiftsByPerson({...giftsByPerson, [user.username]: newGifts})
    if (user.token)
      await giftApi.updateGift(updatedGift, user.token);
    }
  }

  async function onReserve(giftToReserve: GiftType) {
    if (giftToReserve.owner && giftToReserve.name) {
      const newGifts = giftsByPerson[giftToReserve.owner].map(gift => gift.id === giftToReserve.id ? giftToReserve : gift);
      setGiftsByPerson({...giftsByPerson, [giftToReserve.owner]: newGifts})
      if(user.token)
        await giftApi.updateGift(giftToReserve, user.token);
    }
  }

  async function  deleteGift(deletedGift: GiftType) {
    if (user.token && deletedGift.id)
      giftApi.deleteGift(deletedGift, user.token);
    setGiftsByPerson({...giftsByPerson, [user.username]: giftsByPerson[user.username].filter(gift => gift.name !== deletedGift.name)});
  }

  async function restoreCollection() {
    const col = {"Peyo":[{"id":"5fc893c890d9000012c831db","owner":"Peyo","name":"xiaomi redmi note 9 ","price":{"average":"150"},"reservations":[],"types":["techno"]},{"id":"5fc8940690d9000012c831dc","owner":"Peyo","name":"overwatch switch","price":{"average":"30","max":0,"min":0},"reservations":[],"types":["videogame"]},{"id":"5fc8943a90d9000012c831dd","owner":"Peyo","name":"mariot kart live home circuit ","price":{"average":"100","max":0,"min":0},"reservations":[],"types":["videogame"]},{"id":"5fc8946390d9000012c831de","owner":"Peyo","name":"ecouter sans fil (type : airpod)","price":{"average":"30","max":0,"min":0},"reservations":[],"types":["techno"]},{"id":"5fc8953890d9000012c831df","owner":"Peyo","name":"manga haikyuu tome 2 et tome 3 et 4 ","price":{"average":"8","max":0,"min":0},"reservations":[],"types":["book"]}],"Thomas":[{"id":"5fc8960c90d9000012c831e1","owner":"Thomas","name":"Sacoche ordinateur 14\" ou 15,6\" avec grande poche frontale","price":{"average":"40"},"reservations":[],"types":["techno"]},{"id":"5fc8965d90d9000012c831e2","owner":"Thomas","name":"Aspirateur à main Ryobi one + (sans batterie)","price":{"average":"35","max":0,"min":0},"reservations":[],"types":["techno"]}],"Audrey":[{"id":"5fc8bba590d9000012c831e5","owner":"Audrey","name":"Camille Schmoll, Les damnées de la mer ; femmes et frontières en Méditerranée","price":{"average":"20"},"reservations":[],"types":["book"]},{"id":"5fc8bbfb90d9000012c831e6","owner":"Audrey","name":"Veste Twothirds Floreana - Dusty Pink en S  ( https://twothirds.com/products/floreana-dusty-pink?variant=31764491272261 )","price":{"average":"199.20","max":0,"min":0},"reservations":[],"types":["cloth"]}]}
    if (user.token)
      giftApi.addCollection(col, user.token);
  }

  return {giftsByPerson, createGift, updateGift, deleteGift, onReserve, restoreCollection};
}