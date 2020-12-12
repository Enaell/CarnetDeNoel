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
    const col = {"Audrey":[{"id":"5fcd50a58daf2200126b8010","owner":"Audrey","name":"Camille Schmoll, Les damnées de la mer - Femmes et frontières en Méditerranée","price":{"average":"20"},"reservations":[],"types":["book"]},{"id":"5fcd50a58daf2200126b8011","owner":"Audrey","name":"Veste \"Floreana - Dusty Pink\" en taille S , sur le site Twothirds (https://twothirds.com/products/floreana-dusty-pink) ","price":{"average":"199.20","max":0,"min":0},"reservations":[{"userName":"Sylvie"},{"userName":"Luigi"}],"types":["cloth"]},{"id":"5fcd50a58daf2200126b8012","owner":"Audrey","name":"Camille Schmoll, Les damnées de la mer ; femmes et frontières en Méditerranée","price":{"average":"20"},"reservations":[],"types":["book"]},{"id":"5fcd50a58daf2200126b8013","owner":"Audrey","name":"Veste Twothirds Floreana - Dusty Pink en S  ( https://twothirds.com/products/floreana-dusty-pink?variant=31764491272261 )","price":{"average":"199.20","max":0,"min":0},"reservations":[],"types":["cloth"]}],"Peyo":[{"id":"5fcd50a58daf2200126b8014","owner":"Peyo","name":"xiaomi redmi note 9 ","price":{"average":"150"},"reservations":[{"userName":"Aurelien"},{"userName":"Hervé"},{"userName":"Luigi"}],"types":["techno"]},{"id":"5fcd50a58daf2200126b8015","owner":"Peyo","name":"overwatch switch","price":{"average":"30","max":0,"min":0},"reservations":[],"types":["videogame"]},{"id":"5fcd50a58daf2200126b8016","owner":"Peyo","name":"mariot kart live home circuit ","price":{"average":"100","max":0,"min":0},"reservations":[],"types":["videogame"]},{"id":"5fcd50a58daf2200126b8017","owner":"Peyo","name":"ecouter sans fil (type : airpod)","price":{"average":"30","max":0,"min":0},"reservations":[],"types":["techno"]}],"Thomas":[{"id":"5fcd50a58daf2200126b8018","owner":"Thomas","name":"Sacoche ordinateur 14\" ou 15,6\" avec grande poche frontale","price":{"average":"40"},"reservations":[{"userName":"Luigi"}],"types":["techno"]},{"id":"5fcd50a58daf2200126b8019","owner":"Thomas","name":"Aspirateur à main Ryobi one + (sans batterie)","price":{"average":"35","max":0,"min":0},"reservations":[{"userName":"Hervé"}],"types":["techno"]},{"id":"5fcd50a58daf2200126b801a","owner":"Thomas","name":"demi pastel sec (doux /tendre)","price":{"min":0,"max":0,"average":0},"reservations":[],"types":["other"]},{"id":"5fcd50a58daf2200126b801b","owner":"Thomas","name":"Spot led rechargeable","price":{"average":"30","max":0,"min":0},"reservations":[],"types":["techno"]}],"Aurelien":[{"id":"5fcd50a58daf2200126b801c","owner":"Aurelien","name":"Oriflamme (jeu de societe)","price":{"average":"15"},"reservations":[{"userName":"Noah"}],"types":["boardgame"]},{"id":"5fcd50a58daf2200126b801d","owner":"Aurelien","name":"Champs d'honneur (jeu de societe)","price":{"average":"45","max":0,"min":0},"reservations":[{"userName":"Luigi"}],"types":["boardgame"]},{"id":"5fcd50a58daf2200126b801e","owner":"Aurelien","name":"Romeo & Juliette (jeu de societe)","price":{"average":"28","max":0,"min":0},"reservations":[],"types":["boardgame"]},{"id":"5fcd50a58daf2200126b801f","owner":"Aurelien","name":"Qi Aerista","price":{"average":"180","max":"200","min":"160"},"reservations":[],"types":["cooking"]},{"id":"5fcd50a58daf2200126b8020","owner":"Aurelien","name":"Le Tao de la Physique ","price":{"average":"12","max":0,"min":0},"reservations":[],"types":["book"]},{"id":"5fcd50a58daf2200126b8021","owner":"Aurelien","name":"(occasion) Le Taoisme: La revelation continue de Vincent Goossaert","price":{"average":"13","max":0,"min":0},"reservations":[],"types":["book"]},{"id":"5fcd50a58daf2200126b8022","owner":"Aurelien","name":"Bad bones (jeu de societe)","price":{"average":"45","max":0,"min":0},"reservations":[],"types":["boardgame"]},{"id":"5fcd50a58daf2200126b8023","owner":"Aurelien","name":"The Crew","price":{"average":"15","max":0,"min":0},"reservations":[],"types":["boardgame"]},{"id":"5fcd50a58daf2200126b8024","owner":"Aurelien","name":"Rollers","price":{"average":"180","max":"200","min":"150"},"reservations":[],"types":["sport"]}],"Hervé":[{"id":"5fcd50a58daf2200126b8025","owner":"Hervé","name":"Le scorpion Tome 12 Le mauvais augure","price":{"average":"12"},"reservations":[],"types":["book"]},{"id":"5fcd50a58daf2200126b8026","owner":"Hervé","name":"BluRay 3D LA bataille de la montagne du tigre ","price":{"average":"27"},"reservations":[],"types":["other"]},{"id":"5fcd50a58daf2200126b8027","owner":"Hervé","name":"Lunette de près Nooz +2 rectangle silver","price":{"average":"20","max":0,"min":0},"reservations":[{"userName":"Sylvie"}],"types":["other"]},{"id":"5fcd50a58daf2200126b8028","owner":"Hervé","name":"WIka BD Coffret tome 1 à 3","price":{"average":"48","max":0,"min":0},"reservations":[{"userName":"Luigi"}],"types":["book"]},{"id":"5fcd50a58daf2200126b8029","owner":"Hervé","name":"Le Scorpion Tome 13 Tamose L'égyptien","price":{"average":"12","max":0,"min":0},"reservations":[],"types":["book"]},{"id":"5fd232f38daf2200126b8042","owner":"Hervé","name":"Tire Bouchon à assistance ","price":{"average":"20","max":"40"},"reservations":[],"types":["other"]}],"Eric":[{"id":"5fcd50a58daf2200126b802a","owner":"Eric","name":"Liseuse","price":{"min":0,"max":0,"average":0},"reservations":[],"types":["techno"]},{"id":"5fcd50a58daf2200126b802b","owner":"Eric","name":"Tondeuse","price":{"average":0,"max":0,"min":0},"reservations":[{"userName":"Sylvie"}],"types":["other"]},{"id":"5fcd50a58daf2200126b802c","owner":"Eric","name":"Miel origine France","price":{"average":0,"max":0,"min":0},"reservations":[{"userName":"Hervé"}],"types":["cooking"]},{"id":"5fcd50a58daf2200126b802d","owner":"Eric","name":"Chocolat Matou (Vietnam)","price":{"average":0,"max":0,"min":0},"reservations":[{"userName":"Luigi"}],"types":["cooking"]},{"id":"5fcd50a58daf2200126b802e","owner":"Eric","name":"Perceuse visseuse sans fil","price":{"average":0,"max":0,"min":0},"reservations":[],"types":["other"]}],"Valérie":[{"id":"5fcd50a58daf2200126b802f","owner":"Valérie","name":"Coque Samsung galaxy A5 rabatable","price":{"max":"20","min":"5"},"reservations":[{"userName":"Sylvie"}],"types":["techno"]}],"Isabelle":[{"id":"5fcdf48b8daf2200126b8033","owner":"Isabelle","name":"toile cirée ronde Diam entre 1,4 m et 1,6 m","price":{"min":"20","max":"30"},"reservations":[],"types":["book"]},{"id":"5fcdf5048daf2200126b8034","owner":"Isabelle","name":"LE DELF B1 Editeur :Didier 978-2278086276","price":{"average":"17","max":0,"min":0},"reservations":[{"userName":"Hervé"}],"types":["book"]}],"Luigi":[{"id":"5fcdf54e8daf2200126b8035","owner":"Luigi","name":"Bouteilles vin blanc ( Chablis, pouilly fumé)","price":{"average":"10"},"reservations":[{"userName":"Hervé"}],"types":["cooking"]}],"Noah":[{"id":"5fceb19a8daf2200126b8037","owner":"Noah","name":"PS5 avec lecteur cd ","price":{"average":"450","max":"500","min":""},"reservations":[{"userName":"Hervé"}],"types":["videogame"]}],"Sylvie":[{"id":"5fcfe97e8daf2200126b8039","owner":"Sylvie","name":"Rhum Panama Companero","price":{"average":"50"},"reservations":[{"userName":"Luigi"},{"userName":"Hervé"}],"types":["cooking"]}],"Titouan":[{"id":"5fd1d4888daf2200126b803b","owner":"Titouan","name":"Smart TV","price":{"average":"300"},"reservations":[],"types":["techno"]},{"id":"5fd1d4b28daf2200126b803c","owner":"Titouan","name":"Bonnet en laine noir Lacoste","price":{"average":"45","max":0,"min":0},"reservations":[{"userName":"Luigi"}],"types":["cloth"]},{"id":"5fd1d59b8daf2200126b803d","owner":"Titouan","name":"élastiques de musculation YOUNGDO","price":{"average":"15","max":"25","min":"10"},"reservations":[{"userName":"Hervé"}],"types":["sport"]},{"id":"5fd1d6598daf2200126b803e","owner":"Titouan","name":"cache cou NIKE","price":{"average":"14.99","max":0,"min":0},"reservations":[],"types":["cloth"]},{"id":"5fd1d8038daf2200126b803f","owner":"Titouan","name":"CACHE COL DE SKI POLAIRE TANKA NOIR DECATHLON","price":{"average":"4","max":0,"min":0},"reservations":[],"types":["cloth"]},{"id":"5fd1d8f48daf2200126b8040","owner":"Titouan","name":"Bandes LED 15m","price":{"average":"35","max":"40","min":"30"},"reservations":[],"types":["techno"]}]}
    if (user.token)
      giftApi.addCollection(col, user.token);
  }

  return {giftsByPerson, createGift, updateGift, deleteGift, onReserve, restoreCollection};
}