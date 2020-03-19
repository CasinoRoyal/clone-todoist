const transformList = (projects) => {
  return projects.map((project) => {
    return { name: project.title, _id: project._id }
  });
}

export default transformList;