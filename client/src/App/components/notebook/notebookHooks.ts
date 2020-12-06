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
    const col = {"Peyo":[{"id":"5fc9336b0e319700124c184c","owner":"Peyo","name":"xiaomi redmi note 9 ","price":{"average":"150"},"reservations":[{"userName":"Aurelien"},{"userName":"Hervé"}],"types":["techno"]},{"id":"5fc9336b0e319700124c184d","owner":"Peyo","name":"overwatch switch","price":{"average":"30","max":0,"min":0},"reservations":[],"types":["videogame"]},{"id":"5fc9336b0e319700124c184e","owner":"Peyo","name":"mariot kart live home circuit ","price":{"average":"100","max":0,"min":0},"reservations":[],"types":["videogame"]},{"id":"5fc9336b0e319700124c184f","owner":"Peyo","name":"ecouter sans fil (type : airpod)","price":{"average":"30","max":0,"min":0},"reservations":[],"types":["techno"]}],"Thomas":[{"id":"5fc9336b0e319700124c1851","owner":"Thomas","name":"Sacoche ordinateur 14\" ou 15,6\" avec grande poche frontale","price":{"average":"40"},"reservations":[{"userName":"Luigi"}],"types":["techno"]},{"id":"5fc9336b0e319700124c1852","owner":"Thomas","name":"Aspirateur à main Ryobi one + (sans batterie)","price":{"average":"35","max":0,"min":0},"reservations":[{"userName":"Hervé"}],"types":["techno"]},{"id":"5fcb7946a97cd7001302cbe1","owner":"Thomas","name":"demi pastel sec (doux /tendre)","price":{"min":0,"max":0,"average":0},"reservations":[],"types":["other"]},{"id":"5fcb796fa97cd7001302cbe2","owner":"Thomas","name":"Spot led rechargeable","price":{"average":"30","max":0,"min":0},"reservations":[],"types":["techno"]}],"Audrey":[{"id":"5fc9336b0e319700124c1853","owner":"Audrey","name":"Camille Schmoll, Les damnées de la mer ; femmes et frontières en Méditerranée","price":{"average":"20"},"reservations":[],"types":["book"]},{"id":"5fc9336b0e319700124c1854","owner":"Audrey","name":"Veste Twothirds Floreana - Dusty Pink en S  ( https://twothirds.com/products/floreana-dusty-pink?variant=31764491272261 )","price":{"average":"199.20","max":0,"min":0},"reservations":[],"types":["cloth"]}],"Aurelien":[{"id":"5fc935a4a97cd7001302cbcb","owner":"Aurelien","name":"Oriflamme (jeu de societe)","price":{"average":"15"},"reservations":[],"types":["boardgame"]},{"id":"5fc935c8a97cd7001302cbcc","owner":"Aurelien","name":"Champs d'honneur (jeu de societe)","price":{"average":"45","max":0,"min":0},"reservations":[],"types":["boardgame"]},{"id":"5fc935f3a97cd7001302cbcd","owner":"Aurelien","name":"Romeo & Juliette (jeu de societe)","price":{"average":"28","max":0,"min":0},"reservations":[],"types":["boardgame"]},{"id":"5fc9360da97cd7001302cbce","owner":"Aurelien","name":"Qi Aerista","price":{"average":"180","max":"200","min":"160"},"reservations":[],"types":["cooking"]},{"id":"5fc93626a97cd7001302cbcf","owner":"Aurelien","name":"Le Tao de la Physique ","price":{"average":"12","max":0,"min":0},"reservations":[],"types":["book"]},{"id":"5fc9364fa97cd7001302cbd0","owner":"Aurelien","name":"(occasion) Le Taoisme: La revelation continue de Vincent Goossaert","price":{"average":"13","max":0,"min":0},"reservations":[],"types":["book"]},{"id":"5fc93669a97cd7001302cbd1","owner":"Aurelien","name":"Bad bones (jeu de societe)","price":{"average":"45","max":0,"min":0},"reservations":[],"types":["boardgame"]},{"id":"5fc93677a97cd7001302cbd2","owner":"Aurelien","name":"The Crew","price":{"average":"15","max":0,"min":0},"reservations":[],"types":["boardgame"]},{"id":"5fc93689a97cd7001302cbd3","owner":"Aurelien","name":"Rollers","price":{"average":"180","max":"200","min":"150"},"reservations":[],"types":["sport"]}],"Hervé":[{"id":"5fc9b6f8a97cd7001302cbd6","owner":"Hervé","name":"Le scorpion Tome 12 Le mauvais augure","price":{"average":"12"},"reservations":[],"types":["book"]},{"id":"5fcb9fdea97cd7001302cbe4","owner":"Hervé","name":"BluRay 3D LA bataille de la montagne du tigre ","price":{"average":"27"},"reservations":[],"types":["other"]},{"id":"5fcba092a97cd7001302cbe5","owner":"Hervé","name":"Lunette de près Nooz +2 rectangle silver","price":{"average":"20","max":0,"min":0},"reservations":[],"types":["other"]},{"id":"5fcba2b5a97cd7001302cbe6","owner":"Hervé","name":"WIka BD Coffret tome 1 à 3","price":{"average":"48","max":0,"min":0},"reservations":[],"types":["book"]},{"id":"5fcba43ba97cd7001302cbe7","owner":"Hervé","name":"Le Scorpion Tome 13 Tamose L'égyptien","price":{"average":"12","max":0,"min":0},"reservations":[],"types":["book"]}],"Eric":[{"id":"5fcb694ea97cd7001302cbdc","owner":"Eric","name":"Liseuse","price":{"min":0,"max":0,"average":0},"reservations":[],"types":["techno"]},{"id":"5fcb6964a97cd7001302cbdd","owner":"Eric","name":"Tondeuse","price":{"average":0,"max":0,"min":0},"reservations":[],"types":["other"]},{"id":"5fcb697da97cd7001302cbde","owner":"Eric","name":"Miel origine France","price":{"average":0,"max":0,"min":0},"reservations":[],"types":["cooking"]},{"id":"5fcb699aa97cd7001302cbdf","owner":"Eric","name":"Chocolat Matou (Vietnam)","price":{"average":0,"max":0,"min":0},"reservations":[],"types":["cooking"]},{"id":"5fcb69b8a97cd7001302cbe0","owner":"Eric","name":"Perceuse visseuse sans fil","price":{"average":0,"max":0,"min":0},"reservations":[],"types":["other"]}]}
    if (user.token)
      giftApi.addCollection(col, user.token);
  }

  return {giftsByPerson, createGift, updateGift, deleteGift, onReserve, restoreCollection};
}