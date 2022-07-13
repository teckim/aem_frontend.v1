const validators = {
  vLogEmail: [
    v => !!v || 'email required',
    v =>
      // eslint-disable-next-line no-useless-escape
      /^[a-zA-Z0-9 _]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+[ ]*$/.test(v) ||
      'invalid email fromat'
  ],
  vLogPassword: [
    v => !!v || 'password required',
    v => (v || '').length > 7 || 'at least 8 characters'
  ],
  vRegEmail: [
    v => !!v || 'required',
    v => (v || '').length <= 60 || 'max characters 60',
    v =>
      // eslint-disable-next-line no-useless-escape
      /^[a-zA-Z0-9 _]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+[ ]*$/.test(v) ||
      'invalid email format'
  ],
  vRegPassword: [
    v => !!v || 'password required',
    v => (v || '').length > 7 || 'Too short, 8 characters minimum'
  ],
  vRegConfPassword: [v => !!v || 'confirm required'],
  vRegFirstName: [
    v => !!v || 'first name required',
    v => (v || '').length <= 50 || 'max characters 50',
    v => /^[a-z ,.'-]+$/i.test(v) || 'no special characters'
  ],
  vRegLastName: [
    v => !!v || 'last name required',
    v => (v || '').length <= 50 || 'max characters 50',
    v => /^[a-z ,.'-]+$/i.test(v) || 'no special characters'
  ],
  vRegPhonePrefix: [
    v => !!v || 'phone code required',
    v => v !== '0' || '0 not allowed',
    v => (v || '').length <= 4 || 'max digits 4',
    v => /^[0-9]*$/g.test(v) || 'only numbers allowed'
  ],
  vRegPhone: [
    v => !!v || 'phone required',
    v => [9, 8, 10, 11].includes((v || '').length) || 'at least 8 digits',
    v => /^[0-9]*$/g.test(v) || 'only numbers allowed'
  ],
  vRegGender: [v => !!v || 'gender required'],
  vRegMajor: [v => (v || '').length <= 30 || 'max characters 30']
}

export default validators
