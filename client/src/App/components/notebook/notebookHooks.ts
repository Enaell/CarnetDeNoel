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
    // const g = {
    //   Aurelien: [
    //     {owner: 'Aurelien', name: 'Oriflamme', types: ['boardgame'], price: {min: 10, max: 20, average: 15 }, visibility: 'loggedin' } as GiftType,
    //     {owner: 'Aurelien', name: 'Le tao de la Physique', types: ['book'], price: {average: 10 }, visibility: 'loggedin' } as GiftType,
    //     {owner: 'Aurelien', name: 'Oriflamme', types: ['boardgame'], price: {min: 10, max: 20, average: 15 }, visibility: 'loggedin' } as GiftType,
    //     {owner: 'Aurelien', name: 'Le tao de la Physique', types: ['book'], price: {average: 10 }, visibility: 'loggedin' } as GiftType,
    //     {owner: 'Aurelien', name: 'Oriflamme', types: ['boardgame'], price: {min: 10, max: 20, average: 15 }, visibility: 'loggedin' } as GiftType,
    //     {owner: 'Aurelien', name: 'Le tao de la Physique', types: ['book'], price: {average: 10 }, visibility: 'loggedin' } as GiftType,
    //     {owner: 'Aurelien', name: 'Oriflamme', types: ['boardgame'], price: {min: 10, max: 20, average: 15 }, visibility: 'loggedin' } as GiftType,
    //     {owner: 'Aurelien', name: 'Le tao de la Physique', types: ['book'], price: {average: 10 }, visibility: 'loggedin' } as GiftType,
    //     {owner: 'Aurelien', name: 'Oriflamme', types: ['boardgame'], price: {min: 10, max: 20, average: 15 }, visibility: 'loggedin' } as GiftType,
    //     {owner: 'Aurelien', name: 'Le tao de la Physique', types: ['book'], price: {average: 10 }, visibility: 'loggedin' } as GiftType,
    //   ]
    // }
  }, [user]);

  async function createGift(newGift: GiftType) {

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

  async function updateGift(updatedGift: GiftType) {
    const newGifts = giftsByPerson[user.username].map(gift => gift.id === updatedGift.id ? updatedGift: gift);
    
    setGiftsByPerson({...giftsByPerson, [user.username]: newGifts})
    if (user.token)
      await giftApi.updateGift(updatedGift, user.token);
  }

  return {giftsByPerson, createGift, updateGift};
}