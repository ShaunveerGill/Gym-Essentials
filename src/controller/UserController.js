//not clearing proplery
export const resetUserContext = (userContext) => {
    userContext.setUserName('');
    userContext.setGender('');
    userContext.setAge('');
    userContext.setHeight('');
    userContext.setWeight('');
    userContext.setGoal('');
    userContext.setActivityLevel('');
  };
  