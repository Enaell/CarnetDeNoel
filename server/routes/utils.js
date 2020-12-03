const formatter = {
  formatGiftByMember: (gifts) => {
    return gifts.reduce((obj, item) => {
        return { ...obj,
          [item.owner]: obj[item.owner] ? [...obj[item.owner], {
            id: item._id,
            owner: item.owner,
            name: item.name,
            price: item.price,
            reservations: item.reservations,
            types: item.types
          }]
        : [{
          id: item._id,
          owner: item.owner,
          name: item.name,
          price: item.price,
          reservations: item.reservations,
          types: item.types
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
 