export const menteeList = [
  {
    id: 1,
    username: "Aldi123",
    name: "Aldi",
    no_telp: "08231131",
    batch: 1,
    class: {
      id: 1,
      name: "ANDROID",
    },
    mentor: {
      id: 1,
      name: "Siska",
    },
  },
  {
    id: 2,
    username: "Supriadi123",
    name: "Supriadi",
    no_telp: "08231131",
    batch: 1,
    class: {
      id: 2,
      name: "WEB",
    },
    mentor: {
      id: 2,
      name: "Hasna",
    },
  },
]

export const menteeDetail = {
  id: 1,
  username: "Aldi123",
  name: "Aldi",
  email: "hasna@gmail.com",
  no_telp: "08231131",
  university: "Universitas Indonesia",
  batch: 1,
  class: {
    id: 1,
    name: "ANDROID",
  },
  mentor: {
    id: 1,
    name: "Siska",
  },
}

export const assignmenList = [
  {
    id: 1,
    title: "Assignment 1",
    description: "Description 1",
    due_date: "2021-08-01",
    fileUrl: "https://www.google.com",
    isFinalreport: false,
    class: {
      id: 1,
      name: "ANDROID",
    },
  },
  {
    id: 2,
    title: "Assignment 2",
    description: "Description 2",
    due_date: "2021-08-02",
    fileUrl: "https://www.google.com",
    isFinalreport: false,
    class: {
      id: 2,
      name: "WEB",
    },
  },
  {
    id: 3,
    title: "Final Report",
    description: "Description 2",
    due_date: "2021-08-02",
    fileUrl: "https://www.google.com",
    isFinalreport: true,
    class: {
      id: 2,
      name: "WEB",
    },
  },
  {
    id: 4,
    title: "Final Report 2",
    description: "Description 2",
    due_date: "2021-08-02",
    fileUrl: "https://www.google.com",
    isFinalreport: true,
    class: {
      id: 2,
      name: "WEB",
    },
  },
]

export const finalReportAssignment = assignmenList.filter(
  (assignment) => assignment.isFinalreport,
)

export const menteeAssignment = [
  {
    id: 1,
    assignment: {
      id: 1,
      title: "Assignment 1",
      fileUrl: "https://www.google.com",
      due_date: "2021-08-02",
      isFinalreport: false,
    },
    mentee: {
      id: 1,
      name: "Aldi",
    },
    status: "DONE",
    score: 100,
    class: {
      id: 1,
      name: "ANDROID",
    },
  },
  {
    id: 2,
    assignment: {
      id: 1,
      title: "Assignment 1",
      fileUrl: "https://www.google.com",
      due_date: "2021-08-02",
      isFinalreport: false,
    },
    status: "DONE",
    score: 100,
    mentee: {
      id: 1,
      name: "Aldi",
    },
    class: {
      id: 1,
      name: "ANDROID",
    },
  },
  {
    id: 3,
    assignment: {
      id: 4,
      title: "Assignment 4",
      fileUrl: "https://www.google.com",
      due_date: "2021-08-02",
      isFinalreport: true,
    },
    status: "DONE",
    score: 100,
    mentee: {
      id: 1,
      name: "Aldi",
    },
    class: {
      id: 1,
      name: "ANDROID",
    },
  },
]

export const menteeFinalReportAsignment = menteeAssignment.filter(
  (assignment) => assignment.assignment.isFinalreport,
)
