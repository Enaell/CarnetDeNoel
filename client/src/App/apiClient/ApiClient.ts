import { GiftType } from "../components/common/types";

export const giftApi = {
  getAllGifts: async (token?: string) => {
    const getGiftsUrl = `http://46.101.130.5:5000/api/gifts`
    const res = await fetch(getGiftsUrl,
    {
      headers: token ? {
      'Authorization': `Token ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      method:"GET"
    })
    const json = await res.json();
    return json as {[member: string]: GiftType[];};
  },
  createGift: async (gift: GiftType, token: string) => {
    console.log('api client gift CREATE gift');
    console.log(gift);
    try {
      const res = await fetch(`http://46.101.130.5:5000/api/gifts/`,{
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"POST",
        body: JSON.stringify({gifts: [
          gift
        ]})
      });
      const json = await res.json();
      return {success: true, message: json};
    } catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  updateGift: async (gift: GiftType, token: string) => {
    console.log('api client gift update gift');
    console.log(gift);
    try {
      const res = await fetch(`http://46.101.130.5:5000/api/gifts/${gift.id}`,{
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"PATCH",
        body: JSON.stringify({
          gift
        })
      });
      const json = await res.json();
      return {success: true, message: json};
    } catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  deleteGift: async (gift: GiftType, token: string) => {
    console.log('api client gift delete gift');
    console.log(gift);
    try {
      const res = await fetch(`http://localhost:5000/api/gifts/${gift.id}`,{
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"DELETE",
        body: JSON.stringify({
          gift
        })
      });
      const json = await res.json();
      return {success: true, message: json};
    } catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  }
}

export const mailerApi = {
  sendContactEmail: async (name: string, email: string, subject: string, comments: string) => {
    console.log('MAIL API !')
    const res = await fetch('http://localhost:5050/email/contact',
      {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:"POST",
      body: JSON.stringify({ name, email, subject, comments })
    });
    
    return res.status;
  }
}