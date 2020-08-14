FlowRouter.template('/', 'main');

Template.main.onRendered(function() {
  // 화면이 그려지고 난 후 제일 먼저 수행
  Session.set('count', 0);
  Session.set('tags', '');
});

Template.main.helpers({
  // 화면에 데이터를 전달
  tags: function() {
    return DB_TAGS.find({name: Session.get('tags')});
    // return DB_TAGS.findAll();
  },
  count: function() {
    var count = Session.get('count');
    if (!count) {
      return 'Click!';
    } else {
      return 'Count: ' + count;
    }
  }
});

Template.main.events({
  // 화면의 이벤트를 처리
  'keyup #inp-tag': function(evt) {
    if(evt.which === 13) {
      Session.set('tags', $('#inp-tag').val())
    }
    // var tags = Session.get('tags');
    // tags.push($('#inp-tag').val());
    // Session.set('tags', tags);


    // DB_TAGS.insert({
    //   createdAt: new Date(),
    //   name: $('#inp-tag').val()
    // })
  },
  // 'click #btn-save': function() {
  //   var tags = Session.get('tags');
  //   tags.push($('#inp-tag').val());
  //   Session.set('tags', tags);

  //   // 세션값이 바뀌면 세션값을 겟하는 부븐은 알아서 다시 수행해줄께
  //   // 세션값만 잘 바꿔주면 알아서 수행하게 해줌
  //   // 어디서 set을 하는 간에 

  //   // DB_TAGS.insert({ // 이거는 중간에 태그를 지워버리게 되면 비어버려...
  //   //   createdAt: new Date(),
  //   //   name: tags
  //   // })
  // },
  'click #btn-remove': function() {
    //Session.get('tags')
    //javascript array에서 특정 텍스트 값을 찾아서
    // 해당 항목을 지우는 방법
    // DB_TAGS.remove({_id: this._id});
  },
  'click #btn-count': function() {
    Session.set('count', Session.get('count')+1);
  },
  // 최종적으로 써진 태그 DB에 등록
  'click #btn-save-post': function() { // 태그등록 누르고 글등록 또 누르면 마지막 태그가 2번 들어감
    var tags = Session.get('tags');
    tags.push($('#inp-tag').val());
    Session.set('tags', tags);
    DB_TAGS.insert({
      tags: tags
    })
  }
});