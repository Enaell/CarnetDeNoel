const formatter = {
    formatGiftByMember: (gifts) => {
      return gifts.reduce((obj, item) => {
        return { ...obj,
          [item.owner.username]: obj[item.owner.username] ? [...obj[item.owner.username], {
            id: item._id,
            owner: item.owner.username,
            name: item.name,
            price: item.price,
            types: item.types
          }]
        : [{
          id: item._id,
          owner: item.owner.username,
          name: item.name,
          price: item.price,
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
 