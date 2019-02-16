export const teacherLogin = async payload => {
  const requestBody = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(
    "http://localhost:3000/teachers/login",
    requestBody
  );

  const data = await response.json();

  return data;
};

export const teacherSignup = async payload => {
  const requestBody = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(
    "http://localhost:3000/teachers/signup",
    requestBody
  );

  const data = await response.json();

  return data;
};

export const fetchStudentData = async id => {
  const response = await fetch(`http://localhost:3000/api/v1/students/${id}`);

  return await response.json();
};

export const getSessionDetails = async id => {
  const response = await fetch(
    `http://localhost:3000/api/v1/practiceSessions/${id}/sections`
  );

  return await response.json();
};

export const resetTeacherPassword = async email => {
  const requestBody = {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  };
  const response = await fetch(
    `http://localhost:3000/api/v1/teachers/resetPassword`,
    requestBody
  );

  return await response.json();
};

export const changeTeacherPassword = async payload => {
  const requestBody = {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  };
  const response = await fetch(
    `http://localhost:3000/api/v1/teachers/changePassword`,
    requestBody
  );

  return await response.json();
};

export const fetchClass = async id => {
  const response = await fetch(`http://localhost:3000/api/v1/classes/${id}`);

  return await response.json();
};

export const removeFromClass = async id => {
  const requestBody = {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(
    `http://localhost:3000/api/v1/classes/students/${id}/remove`,
    requestBody
  );

  return await response.json();
};
