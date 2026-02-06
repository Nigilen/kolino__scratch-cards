interface Data {
  title: string;
  cards: {
    values: string[];
  };
  modal: {
    title: string;
    bonus: string;
    button: string;
  };
};

export const data: Data = {
  title: 'Scratch The Cards',
  cards: {
    values: ['2000', 'Empty', '50']
  },
  modal: {
    title: 'Your prize',
    bonus: 'none',
    button: 'Ok'
  }
};