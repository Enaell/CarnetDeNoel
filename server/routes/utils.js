const formatter = {
  formatGiftByMember: (gifts) => {
    return gifts.reduce((obj, item) => {
      const gift = item.data();
        return { ...obj,
          [gift.owner]: obj[gift.owner] ? [...obj[gift.owner], {
            id: gift._id,
            owner: gift.owner,
            name: gift.name,
            price: gift.price,
            reservations: gift.reservations,
            types: gift.types
          }]
        : [{
          id: gift._id,
          owner: gift.owner,
          name: gift.name,
          price: gift.price,
          reservations: gift.reservations,
          types: gift.types
        }]}   
    }, {})
    
  },
  formatGiftUpdates: (gift) => {
    let giftUpdates = {
      ...gift,
    };
    delete giftUpdates.owner;
    delete giftUpdates.id;
    return giftUpdates;
  }
}

module.exports = formatter
