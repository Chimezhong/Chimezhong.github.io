<template>
  <footer>
    <div class="footer">
      <p>
        Copyright
        <span> fallzhong@163.com. </span>
        All rights By
        <span> Reserved. </span>
      </p>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .footer p {
    font-size: 14px;
    line-height: 17px;
  }
  p span{
    color: var(--primary-bg-light);
  }
}
</style>
