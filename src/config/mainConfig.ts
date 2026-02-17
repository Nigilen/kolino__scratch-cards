interface MainConfig {
  title: string;
  cards: {
    quantity: number;
    values: {
      win: string;
      empty: string;
    };
  };
  modal: {
    title: string;
    button: string;
  };
};

export const mainConfig: MainConfig = {
  title: 'Scratch The Cards',
  cards: {
    quantity: 3,
    values: {
      win: '100',
      empty: 'empty'
    }
  },
  modal: {
    title: 'Your prize',
    button: 'Ok'
  }
};