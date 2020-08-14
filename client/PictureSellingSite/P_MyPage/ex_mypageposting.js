FlowRouter.template('/ex_mypageposting/:_id', 'ex_mypageposting');


Template.ex_mypageposting.onRendered(function() {
  $('#editor').summernote({
    popover: {},
    minHeight: 200,
    maximumImageFileSize: 1048576*10
  });
});

Template.ex_mypageposting.helpers({
  post: function() {
    var _id = FlowRouter.getParam('_id'); // FlowRouter.getParam 사실 이해 안감
    if(_id === 'newPosting') {
      return {};    //새글 작성일때는 화면에 비어있는 데이터를 제공.
    }

    Meteor.setTimeout(function() { //화면 에디터에 편집 모드를 초기화 하기 위한 트릭
      $('#editor').summernote('reset')
    });

    return Meteor.users.findOne({_id: _id}); // 확실함?
  },
  link: function() {
    return DB_FILES.findOne({_id: this.file_id}).link();
  }
});

Template.ex_mypageposting.events({

  'click #btn-save': function() { 

    var file = $('#inp-file').prop('files')[0]; //프사
    var file_id = DB_FILES.insertFile(file);
    // var name = $('#inp-name').val(); //유저이름(삭제)
    var title = $('#inp-title').val(); //자기소개
    var email = $('#inp-email').val(); //이메일
    var oldpassword = $('inp-oldpassword').val(); //이전 비번
    var newpassword = $('inp-newpassword').val(); //새로운 비번
    var newpasswordconfirm = $('inp-newpasswordconfirm').val(); //새로운 비번

    if(!title) { // 빈 태그...!!!
      return alert('자기소개를 반드시 입력 해 주세요.');
    }
    var _id = FlowRouter.getParam('_id');
    if( _id === 'newPosting') {

    }
   else {
      var userInfo = Meteor.user();
      Meteor.users.update({_id: userInfo._id}, {
        $set: {
          'profile.profile_picture': file_id,
          'profile.name': name,
          'profile.introduce': title,
          'emails.0.address' : email
        }
      });
      Accounts.changePassword = (oldpassword, newpassword, callback) => {
        if (!Meteor.user()) {
          return reportError(new Error("Must be logged in to change password."), callback);
        }
      
        if (!newPassword instanceof String) {
          return reportError(new Meteor.Error(400, "Password must be a string"), callback);
        }
      
        if (!newPassword) {
          return reportError(new Meteor.Error(400, "Password may not be empty"), callback);
        }
      }

    alert('저장하였습니다.');
    $('#inp-file').val(''); // 이거 추가
    // $('#inp-name').val('');
    $('#inp-title').val('');
    $('#inp-email').val('');
    $('#inp-oldpassword').val('');
    $('#inp-newpassword').val('');
    $('#inp-newpasswordconfirm').val('');
    $('#editor').summernote('reset');
    window.history.back();
  
  }

}
})