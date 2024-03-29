import { getFirestore } from "@firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { giftApi } from "../../apiClient/ApiClient";
import { GiftType, UserType } from "../common/types";


export function useNoteBook() {
  
  const user = useSelector((state: any) => state.user as UserType)

  const [giftsByPerson, setGiftsByPerson] = useState({} as {[member: string] : GiftType[]} );
  
  useEffect(() => {
    giftApi.getAllGifts(user?.token).then(gifts => {
      console.log('===========================================')
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
          const gift = {...newGift, id: newGift.name}
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
    const col = {"Audrey":[{"id":"5fdc5a5e8daf2200126b80d3","owner":"Audrey","name":"Camille Schmoll, Les damnées de la mer - Femmes et frontières en Méditerranée","price":{"average":"20"},"reservations":[],"types":["book"]},{"id":"5fdc5a5e8daf2200126b80d4","owner":"Audrey","name":"Paolo Cognetti, Sans jamais atteindre le sommet ","price":{"average":"17.50"},"reservations":[],"types":["book"]},{"id":"5fdc5a5e8daf2200126b80d5","owner":"Audrey","name":"Nuisette Fenêtre sur jardin , Ysé en taille 36 ( https://www.yse-paris.com/fr/accueil/1792-nuisette-fenetre-sur-jardin.html#/43-taille_bas_et_maillots-34/350-couleur-groseille )","price":{"average":"75"},"reservations":[{"userName":"Thomas"}],"types":["cloth"]},{"id":"5fdc5a5e8daf2200126b80d6","owner":"Audrey","name":"Des plantes vertes toutes mignonnettes ","price":{"min":0,"max":0,"average":0},"reservations":[],"types":["other"]},{"id":"5fdc5a5e8daf2200126b80d7","owner":"Audrey","name":"Boucle d'oreille ALABAMA , Apache bijoux ( https://www.apachecreation.com/shop/boucles-oreilles/boucles-alabama/ ) ","price":{"average":"99","max":0,"min":0},"reservations":[{"userName":"Luigi"}],"types":["jewel"]}],"Peyo":[{"id":"5fdc5a5e8daf2200126b80d8","owner":"Peyo","name":"xiaomi redmi note 9 ","price":{"average":"150"},"reservations":[{"userName":"Aurelien"},{"userName":"Hervé"},{"userName":"Luigi"},{"userName":"Eric"}],"types":["techno"]},{"id":"5fdc5a5e8daf2200126b80d9","owner":"Peyo","name":"overwatch switch","price":{"average":"30","max":0,"min":0},"reservations":[],"types":["videogame"]},{"id":"5fdc5a5e8daf2200126b80da","owner":"Peyo","name":"mariot kart live home circuit ","price":{"average":"100","max":0,"min":0},"reservations":[],"types":["videogame"]},{"id":"5fdc5a5e8daf2200126b80db","owner":"Peyo","name":"ecouter sans fil (type : airpod)","price":{"average":"30","max":0,"min":0},"reservations":[],"types":["techno"]},{"id":"5fdd1c038daf2200126b810f","owner":"Peyo","name":"croix-rouge","price":{"min":0,"max":0,"average":0},"reservations":[],"types":["association"]}],"Thomas":[{"id":"5fdc5a5e8daf2200126b80dc","owner":"Thomas","name":"Sacoche ordinateur 14\" ou 15,6\" avec grande poche frontale","price":{"average":"40"},"reservations":[{"userName":"Luigi"}],"types":["techno"]},{"id":"5fdc5a5e8daf2200126b80dd","owner":"Thomas","name":"Aspirateur à main Ryobi one + (sans batterie)","price":{"average":"35","max":0,"min":0},"reservations":[{"userName":"Hervé"}],"types":["techno"]},{"id":"5fdc5a5e8daf2200126b80de","owner":"Thomas","name":"demi pastel sec (doux /tendre)","price":{"min":0,"max":0,"average":0},"reservations":[{"userName":"Aurelien"}],"types":["other"]},{"id":"5fdc5a5e8daf2200126b80df","owner":"Thomas","name":"Spot led rechargeable","price":{"average":"30","max":0,"min":0},"reservations":[],"types":["techno"]}],"Aurelien":[{"id":"5fdc5a5e8daf2200126b80e0","owner":"Aurelien","name":"Oriflamme (jeu de societe)","price":{"average":"15"},"reservations":[{"userName":"Noah"},{"userName":"Sylvie"}],"types":["boardgame"]},{"id":"5fdc5a5e8daf2200126b80e1","owner":"Aurelien","name":"Champs d'honneur (jeu de societe)","price":{"average":"45","max":0,"min":0},"reservations":[{"userName":"Luigi"}],"types":["boardgame"]},{"id":"5fdc5a5e8daf2200126b80e2","owner":"Aurelien","name":"Romeo & Juliette (jeu de societe)","price":{"average":"28","max":0,"min":0},"reservations":[{"userName":"Eric"}],"types":["boardgame"]},{"id":"5fdc5a5e8daf2200126b80e3","owner":"Aurelien","name":"Qi Aerista","price":{"average":"180","max":"200","min":"160"},"reservations":[],"types":["cooking"]},{"id":"5fdc5a5e8daf2200126b80e4","owner":"Aurelien","name":"Le Tao de la Physique ","price":{"average":"12","max":0,"min":0},"reservations":[{"userName":"Eric"}],"types":["book"]},{"id":"5fdc5a5e8daf2200126b80e5","owner":"Aurelien","name":"(occasion) Le Taoisme: La revelation continue de Vincent Goossaert","price":{"average":"13","max":0,"min":0},"reservations":[],"types":["book"]},{"id":"5fdc5a5e8daf2200126b80e6","owner":"Aurelien","name":"Bad bones (jeu de societe)","price":{"average":"45","max":0,"min":0},"reservations":[],"types":["boardgame"]},{"id":"5fdc5a5e8daf2200126b80e7","owner":"Aurelien","name":"The Crew","price":{"average":"15","max":0,"min":0},"reservations":[{"userName":"Sylvie"}],"types":["boardgame"]},{"id":"5fdc5a5e8daf2200126b80e8","owner":"Aurelien","name":"Rollers","price":{"average":"180","max":"200","min":"150"},"reservations":[],"types":["sport"]}],"Hervé":[{"id":"5fdc5a5e8daf2200126b80e9","owner":"Hervé","name":"Le scorpion Tome 12 Le mauvais augure","price":{"average":"12"},"reservations":[],"types":["book"]},{"id":"5fdc5a5e8daf2200126b80ea","owner":"Hervé","name":"BluRay 3D LA bataille de la montagne du tigre ","price":{"average":"27"},"reservations":[{"userName":"Eric"}],"types":["other"]},{"id":"5fdc5a5e8daf2200126b80eb","owner":"Hervé","name":"Lunette de près Nooz +2 rectangle silver","price":{"average":"20","max":0,"min":0},"reservations":[{"userName":"Sylvie"}],"types":["other"]},{"id":"5fdc5a5e8daf2200126b80ec","owner":"Hervé","name":"WIka BD Coffret tome 1 à 3","price":{"average":"48","max":0,"min":0},"reservations":[{"userName":"Luigi"}],"types":["book"]},{"id":"5fdc5a5e8daf2200126b80ed","owner":"Hervé","name":"Le Scorpion Tome 13 Tamose L'égyptien","price":{"average":"12","max":0,"min":0},"reservations":[],"types":["book"]},{"id":"5fdc5a5e8daf2200126b80ee","owner":"Hervé","name":"Tire Bouchon à assistance ","price":{"average":"20","max":"40"},"reservations":[],"types":["other"]}],"Eric":[{"id":"5fdc5a5e8daf2200126b80ef","owner":"Eric","name":"Liseuse","price":{"min":0,"max":0,"average":0},"reservations":[],"types":["techno"]},{"id":"5fdc5a5e8daf2200126b80f0","owner":"Eric","name":"Miel origine France","price":{"average":0,"max":0,"min":0},"reservations":[{"userName":"Hervé"}],"types":["cooking"]},{"id":"5fdc5a5e8daf2200126b80f1","owner":"Eric","name":"Chocolat Matou (Vietnam) ou autres tablette chocolat noir","price":{"average":0,"max":0,"min":0},"reservations":[{"userName":"Luigi"}],"types":["cooking"]},{"id":"5fdc5a5e8daf2200126b80f2","owner":"Eric","name":"Perceuse visseuse sans fil","price":{"average":0,"max":0,"min":0},"reservations":[],"types":["other"]},{"id":"5fdc5a5e8daf2200126b80f3","owner":"Eric","name":"Thé vert ou blanc en vrac","price":{"min":0,"max":0,"average":0},"reservations":[],"types":["other"]}],"Valérie":[{"id":"5fdc5a5e8daf2200126b80f4","owner":"Valérie","name":"Coque Samsung galaxy A5 rabatable","price":{"max":"20","min":"5"},"reservations":[{"userName":"Sylvie"}],"types":["techno"]},{"id":"5fdc5a5e8daf2200126b80f5","owner":"Valérie","name":"Plantes jardin","price":{"min":0,"max":0,"average":0},"reservations":[{"userName":"Luigi"}],"types":["sport"]}],"Isabelle":[{"id":"5fdc5a5e8daf2200126b80f6","owner":"Isabelle","name":"toile cirée ronde Diam entre 1,4 m et 1,6 m","price":{"min":"20","max":"30"},"reservations":[{"userName":"Sylvie"}],"types":["book"]},{"id":"5fdc5a5e8daf2200126b80f7","owner":"Isabelle","name":"LE DELF B1 Editeur :Didier 978-2278086276","price":{"average":"17","max":0,"min":0},"reservations":[{"userName":"Hervé"}],"types":["book"]},{"id":"5fddd61b8daf2200126b8111","owner":"Isabelle","name":"Plat à tarte en porcelaine","price":{"average":"25"},"reservations":[],"types":["cooking"]}],"Luigi":[{"id":"5fdc5a5e8daf2200126b80f8","owner":"Luigi","name":"Bouteilles vin blanc ( Chablis, pouilly fumé)","price":{"average":"10"},"reservations":[{"userName":"Hervé"},{"userName":"Sylvie"}],"types":["cooking"]}],"Noah":[{"id":"5fdc5a5e8daf2200126b80f9","owner":"Noah","name":"PS5 avec lecteur cd ","price":{"average":"450","max":"500","min":""},"reservations":[{"userName":"Aurelien"},{"userName":"Luigi"}],"types":["videogame"]},{"id":"5fdc5a5e8daf2200126b80fa","owner":"Noah","name":"The Last of Us Part II (ps4)","price":{"average":"40"},"reservations":[{"userName":"Hervé"}],"types":["videogame"]},{"id":"5fdc5a5e8daf2200126b80fb","owner":"Noah","name":"QiaoFei - Cactus néon","price":{"average":"15","max":0,"min":0},"reservations":[],"types":["techno"]}],"Sylvie":[{"id":"5fdc5a5e8daf2200126b80fc","owner":"Sylvie","name":"Rhum Panama Companero","price":{"average":"50"},"reservations":[{"userName":"Luigi"},{"userName":"Hervé"}],"types":["cooking"]}],"Titouan":[{"id":"5fdc5a5e8daf2200126b80fd","owner":"Titouan","name":"Smart TV","price":{"average":"300"},"reservations":[],"types":["techno"]},{"id":"5fdc5a5e8daf2200126b80fe","owner":"Titouan","name":"Bonnet en laine noir Lacoste","price":{"average":"45","max":0,"min":0},"reservations":[{"userName":"Luigi"}],"types":["cloth"]},{"id":"5fdc5a5e8daf2200126b80ff","owner":"Titouan","name":"élastiques de musculation YOUNGDO","price":{"average":"15","max":"25","min":"10"},"reservations":[{"userName":"Hervé"}],"types":["sport"]},{"id":"5fdc5a5e8daf2200126b8100","owner":"Titouan","name":"cache cou NIKE","price":{"average":"14.99","max":0,"min":0},"reservations":[],"types":["cloth"]},{"id":"5fdc5a5e8daf2200126b8101","owner":"Titouan","name":"CACHE COL DE SKI POLAIRE TANKA NOIR DECATHLON","price":{"average":"4","max":0,"min":0},"reservations":[],"types":["cloth"]},{"id":"5fdc5a5e8daf2200126b8102","owner":"Titouan","name":"Bandes LED 15m","price":{"average":"35","max":"40","min":"30"},"reservations":[],"types":["techno"]}],"Yann":[{"id":"5fdc5a5e8daf2200126b8103","owner":"Yann","name":"nike sweat à capuche foundation full zip homme /couleur : gris /taille: S","price":{"min":0,"max":0,"average":0},"reservations":[{"userName":"Sylvie"}],"types":["cloth"]},{"id":"5fdc5a5e8daf2200126b8104","owner":"Yann","name":"nike sportswear tech fleece/ couleur: gris/ taille: S","price":{"average":0,"max":0,"min":0},"reservations":[],"types":["cloth"]}],"Eva":[{"id":"5fdc5a5e8daf2200126b8105","owner":"Eva","name":"Parfum Amor Amor de Cacharel","price":{"min":0,"max":0,"average":0},"reservations":[{"userName":"Hervé"},{"userName":"Eric"}],"types":["other"]}],"Lulu":[{"id":"5fdc5a5e8daf2200126b8106","owner":"Lulu","name":"fard à paupière MORPHE Jaclyn hill palette Volume II","price":{"average":"22"},"reservations":[],"types":["other"]},{"id":"5fdc5a5e8daf2200126b8107","owner":"Lulu","name":"MORPHE 35H Hot Spot Artistry Palette ET 35I ICI Fantasy Artistry Palette","price":{"average":"25","max":0,"min":0},"reservations":[{"userName":"Eric"}],"types":["other"]},{"id":"5fdc5a5e8daf2200126b8108","owner":"Lulu","name":"HUDA BEAUTY Desert Dusk Eyeshadow palette","price":{"average":"54","max":0,"min":0},"reservations":[],"types":["other"]},{"id":"5fdc5a5e8daf2200126b8109","owner":"Lulu","name":"HUDA BEAUTY Obsessions Palette Ruby","price":{"average":"13","max":0,"min":0},"reservations":[],"types":["other"]}]}
    if (user.token)
      giftApi.addCollection(col, user.token);
  }

  return {giftsByPerson, createGift, updateGift, deleteGift, onReserve, restoreCollection};
}