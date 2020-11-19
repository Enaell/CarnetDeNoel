const formatter = {
    formatgiftUpdates: (gift) => {
      let giftUpdates = {
        ...gift,
      };
      delete giftUpdates.owner;
      delete giftUpdates.id;
      return giftUpdates;
    }
}

module.exports = formatter
 