FlowRouter.template('/', 'ex_navbar');

Template.ex_navbar.onCreated(function() {
    var _id = FlowRouter.getParam('_id')
});

Template.ex_navbar.helpers({
    link: function() { // 얘가 여기 있어야해?
        // 저장 된 이미지 링크를 반환
        return Meteor.userId();
    },
    picture: function() {
        // return DB_FILES.findOne({_id: this.file_id}).link();
        return Meteor.user().profile.profile_picture; // 일단 .link() 붙는걸로 가자
      },
});

Template.ex_navbar.events({

    'click #btn-ex_carousel': function() {
        Meteor.logout();
        alert("로그아웃 되었습니다.");
    }
});

// 만약에 있으면 링크 첫번째 꺼를 불러오고
// 만약에 없으면 그냥 mypage창