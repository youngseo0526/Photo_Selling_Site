Meteor.startup(function() {
  // code to run on server at startup
  if (!Meteor.users.findOne({username: 'admin'})) {
    //유저(관리자) 생성 예
    Accounts.createUser({
      username: 'admin',
      email: 'admin@admin.admin',
      password: 'admin!24',
      profile: {
        //이름, 주소 등 원하는 사용자 데이터
        type: 'admin',
        name: '관리자'
      },
    });
  }

  // console.log(Meteor.users.findOne({_id: 'DmyTS5wvCjPbuT53h'}))

  // Meteor.users.update({_id: 'DmyTS5wvCjPbuT53h'}, {
  //   $set: {
  //     'emails.0.address': 'new2222@email.com'
  //   }
  // });

});

