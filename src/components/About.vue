<template>
  <div class="about">
    <div class="about-header">
      <p>What is Codelog?</p>
    </div>
    <div class="about-body">
      Codelog는 일상속에서 스쳐 지나가는 개발 관련 URL들을 한곳에 집중시키기 위해 제작된 사이트입니다. 
    </div>
    <div class="about-header">
      <p>Notice</p>
    </div>
    <div class="about-body">
      본 사이트는 유저의 Github 이메일, 닉네임, 액세스 토큰을 수집합니다. 하지만 이 정보들은 개인을 식별하기 위해서만 사용되며 기타 다른 정보들은 저장하지 않습니다.<br />
    </div>    
    <div class="about-header">
      <p>Rules</p>
    </div>
    <div class="about-body">
      1. Github 로그인만 지원합니다.<br />
      2. 유효한 URL만 올려주세요.<br />
      3. 의도적인 홍보글은 즉시 제제됩니다.<br />
      4. 본 사이트의 목적에 부합하지 않는 글은 즉시 제재됩니다.<br />
      5. 본 사이트는 크롬 브라우저에 최적회되어 있습니다.
    </div>
    <div class="about-header">
      <p>Contact</p>
    </div>
    <div class="about-body">
      <a href="mailto:padocon@naver.com">padocon@naver.com</a>
    </div>
  </div>
</template>

<script>
export default {
    name: 'About'
}
</script>

<style scoped>
.about {
}
.about-header {
  /* max-width: 500px; */
  margin-bottom: -15px;
}
.about-header p {
  font-size: 20px;
  font-weight: 600;
}
.about-body {
  /* max-width: 500px; */
}
</style>