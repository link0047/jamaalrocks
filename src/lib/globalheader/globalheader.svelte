<header class="global-header">
  <div class="page-container">
    <div role="group" class="group">
    <button class="btn btn--icon" aria-label="Menu" type="button">
      <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
        <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"/>
      </svg>
    </button>
    </div>
    <div role="group" class="group">
      <button class="btn btn--icon" aria-label="Account" type="button">
        <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2M7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.5.88 4.93 1.78A7.893 7.893 0 0 1 12 20c-1.86 0-3.57-.64-4.93-1.72m11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.928 7.928 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.5-1.64 4.83M12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6m0 5a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 8a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 11Z"/>
        </svg>
        <div>
        <div class="subtext">Sign in</div>
        <div class="text">Account</div>
        </div>
      </button>
      <button class="btn btn--icon" aria-label="Cart" type="button">
        <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
          <path d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2M1 2v2h2l3.6 7.59-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25c0-.05.01-.09.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2Z"/>
        </svg>
        <div class="notification-badge">0</div>
      </button>
    </div>
  </div>
</header>
<style>
  .subtext,
  .text {
    text-align: left;
    line-height: 1.1;
  }

  .subtext {
    font-size: 12px;
  }

  .text {
    font-weight: 500;
    font-size: 16px;
  }

  .global-header {
    width: 100%;
    position: relative;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    will-change: background;
    background-color: #fff;
    box-shadow: rgb(33 33 33 / 15%) 0px 1px 2px;
    z-index: 9;
  }

  .page-container {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    max-width: 1200px;
    padding: 0px 8px;
    justify-content: space-between;
  }

  .icon {
    width: 24px;
    height: 24px;
    fill: #212121;
  }

  .btn {
    -webkit-tap-highlight-color: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 1.875rem;
    text-decoration: none;
    text-transform: initial;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: 64px;
    height: 36px;
    padding: 0 16px;
    border: none;
    border-radius: 4px;
    outline: 0;
    background-color: transparent;
    overflow: hidden;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-appearance: none;
    appearance: none;
    will-change: background-color;
    gap: 4px;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn:not(:disabled) {
    color: #212121;
    background-color: transparent;
  }

  .btn:hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }

  .btn--icon {
    padding: 0 8px;
    min-width: 32px;
    height: 40px;
    transition: transform 0.3s ease-in;
  }

  .notification-badge {
    background-color: #2a508f;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
    display: flex;
    height: 16px;
    min-width: 16px;
    padding: 0 4px;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 8px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .group {
    display: flex;
  }
</style>