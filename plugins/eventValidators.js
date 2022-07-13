export const general = {
  vProject: [v => !!v || 'project required'],
  vSubject: [
    v => !!v || 'subject required',
    v => (v || '').length <= 50 || '50 characters max'
  ],
  vLocation: [v => !!v || 'location required'],
  vAbout: [v => (v || '').length <= 500 || '500 characters max']
}
export const timing = {
  vStartDate: [v => !!v || 'start date required'],
  vEndDate: [v => !!v || 'end date required'],
  vStartTime: [v => !!v || 'start time required'],
  vEndTime: [v => !!v || 'end time required']
}
export const tickets = {
  vTickets: [v => !!v || 'required', v => v >= 10 || 'at least 10']
}
