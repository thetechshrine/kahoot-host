const initState = () => ({
  games: [],
  game: {},
});

export default (state = initState(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};
