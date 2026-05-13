"use strict";
(() => {
  // src/strings.js
  var loadingText = "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C...";
  var tip = "<br/>(\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435/\u0441\u0430\u0439\u0442)";
  var tipConnection = "<br/>\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 (\u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0442\u0438 \u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442, VPN, \u0430\u043D\u0442\u0438-DPI, \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430)";
  var fewCharactersText = "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B 3 \u0441\u0438\u043C\u0432\u043E\u043B\u0430 =]";
  var unknownTypeText = `<span class="error">\u041D\u0435 \u043F\u043E\u043D\u044F\u0442\u043D\u043E, \u0447\u0442\u043E \u044D\u0442\u043E \u0442\u0430\u043A\u043E\u0435 :|</span>` + tip;
  var brokeReviewsText = "\u041E\u0442\u0437\u044B\u0432\u044B \u043F\u0440\u0438\u0448\u043B\u0438 \u0441\u043B\u043E\u043C\u0430\u043D\u043D\u044B\u0435 =(" + tip;
  var brokeSearchText = "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u0440\u0438\u0448\u043B\u0438 \u0441\u043B\u043E\u043C\u0430\u043D\u043D\u044B\u0435 =(" + tip;
  var emptyCommentsList = "\u041E\u0442\u0437\u044B\u0432\u044B \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \\(O_o)/";
  function statusReviewsText(status) {
    switch (status) {
      case 0:
        return `<span class="error">\u0421\u0435\u0440\u0432\u0435\u0440 \u0441 \u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D =(</span>` + tipConnection;
      case 401:
        return "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u043E\u0439\u0434\u0438\u0442\u0435, \u044D\u0442\u043E \u0431\u044B\u0441\u0442\u0440\u043E =)";
      case 404:
        return "\u041E\u0442\u0437\u044B\u0432\u044B \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \\(O_o)/";
      default:
        return `\u0421\u0435\u0440\u0432\u0435\u0440 \u043F\u0440\u0438\u0441\u043B\u0430\u043B "${status}" \u0432\u043C\u0435\u0441\u0442\u043E \u043E\u0442\u0437\u044B\u0432\u043E\u0432 =(`;
    }
  }
  function statusSearchText(status) {
    switch (status) {
      case 0:
        return `<span class="error">\u0421\u0435\u0440\u0432\u0435\u0440 \u0441 \u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D =(</span>` + tipConnection;
      case 401:
        return "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u043E\u0439\u0434\u0438\u0442\u0435, \u044D\u0442\u043E \u0431\u044B\u0441\u0442\u0440\u043E =)";
      case 404:
        return "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \\(O_o)/";
      default:
        return `\u0421\u0435\u0440\u0432\u0435\u0440 \u043F\u0440\u0438\u0441\u043B\u0430\u043B "${status}" \u0432\u043C\u0435\u0441\u0442\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043F\u043E\u0438\u0441\u043A\u0430 =(`;
    }
  }
  function authStatusText(isu, name) {
    return name ? `${name} (${isu})` : `${isu}`;
  }
  var symbols = { "teacher": "\u{1F468}\u200D\u{1F3EB}", "subject": "\u{1F4DA}", "add": "\u2795" };
  var authpLabel = `\u042D\u0442\u043E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u043E <b>ID.ITMO</b> \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u043E\u043A\u0441\u0438.<br/>
\u041D\u0430\u0436\u0438\u043C\u0430\u044F \u043A\u043D\u043E\u043F\u043A\u0443 "\u0412\u0445\u043E\u0434" \u0432\u044B \u0434\u0430\u0451\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 <b>\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445</b>:<br/>
<i>\u0421\u0430\u0439\u0442 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442 \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F (ISU) \u0434\u043B\u044F \u043F\u0440\u0435\u0434\u043E\u0442\u0432\u0440\u0430\u0449\u0435\u043D\u0438\u044F \u043D\u0430\u043A\u0440\u0443\u0442\u043E\u043A \u0438 \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441\u0435\u0440\u0432\u0438\u0441\u0430. <br/>
\u0414\u0430\u043D\u043D\u044B\u0435 \u043D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u044E\u0442\u0441\u044F \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C. \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0441\u0432\u043E\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445.</i>
`;
  var authpCredentials = "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C!";
  var authpError = "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043B\u043E\u0433\u0438\u043D \u0438 \u043F\u0430\u0440\u043E\u043B\u044C! \u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0431\u044B\u043B \u043D\u0430\u0440\u0443\u0448\u0435\u043D";
  var loginBtnLabel = "\u0412\u0445\u043E\u0434";
  var loginLoadingBtnLabel = "\u0412\u0445\u043E\u0434 \u231B";
  var menuLogoutBtnLabel = `<span class="error">\u{1F494} \u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430</span>`;
  var menuAddReviewBtnLabel = "\u{1F4DD} \u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043E\u0442\u0437\u044B\u0432";
  var menuMyReviewBtnLabel = "\u{1F4CB} \u041C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F";
  var mainHeader = "\u041F\u043E\u0438\u0441\u043A \u043E\u0442\u0437\u044B\u0432\u043E\u0432";
  var loginHeader = "\u0412\u0445\u043E\u0434";
  var addHeader = "\u041D\u043E\u0432\u044B\u0439 \u043E\u0442\u0437\u044B\u0432";
  var moderationHeader = "\u041C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F";
  var suggestionStatus = { "delayed": "\u043D\u0430 \u0440\u0430\u0441\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u0438\u0438", "accepted": "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D", "rejected": "\u043E\u0442\u043A\u043B\u043E\u043D\u0451\u043D" };
  var suggestionSource = { 0: "n/a", 1: "reviews", 2: "gs-parser" };

  // src/ui/tabs/creation/renderMainPage.js
  function renderMainPage() {
    return `
        <div class="category">
            <h3 class="category-title">\u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439</h3>
            <div class="tiles-container">
                <div class="tile orange" data-id="101">A1</div>
                <div class="tile orange" data-id="102">A2</div>
                <div class="tile orange" data-id="103">B1.1</div>
                <div class="tile orange" data-id="104">B1.2</div>
                <div class="tile orange" data-id="105">B2</div>
                <div class="tile orange" data-id="106">C1</div>
                <div class="tile orange" data-id="107">C2</div>
            </div>
        </div>

        <div class="category">
            <h3 class="category-title">\u041E\u0431\u0449\u0438\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u044B</h3>
            <div class="tiles-container">
                <div class="tile green" data-id="35">\u0424\u0438\u0437\u043A\u0443\u043B\u044C\u0442\u0443\u0440\u0430</div>
                <div class="tile green" data-id="2">\u0424\u0438\u043B\u043E\u0441\u043E\u0444\u0438\u044F</div>
                <div class="tile green" data-id="9">\u041A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0438 \u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u043E\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435</div>
                <div class="tile green" data-id="47">\u0422\u0435\u0445\u043D\u0438\u043A\u0438 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0445 \u0432\u044B\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0439</div>
                <div class="tile green" data-id="25">\u0424\u0438\u0437\u0438\u043A\u0430</div>
            </div>
        </div>

        <div class="category">
            <h3 class="category-title">\u041C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430</h3>
            <div class="tiles-container">
                <div class="tile red" data-id="10">\u041C\u0430\u0442\u0430\u043D\u0430\u043B\u0438\u0437</div>
                <div class="tile red" data-id="11">\u041C\u0430\u0442\u0430\u043D\u0430\u043B\u0438\u0437 (\u043F\u0440\u043E\u0434)</div>
                <div class="tile red" data-id="12">\u0410\u043B\u0433\u0435\u0431\u0440\u0430</div>
                <div class="tile red" data-id="13">\u0410\u043B\u0433\u0435\u0431\u0440\u0430 (\u043F\u0440\u043E\u0434)</div>
                <div class="tile red" data-id="14">\u0414\u0438\u0441\u043A\u0440\u0435\u0442\u043D\u0430\u044F \u043C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430</div>
                <div class="tile red" data-id="23">\u0422\u0435\u043E\u0440\u0432\u0435\u0440</div>
                <div class="tile red" data-id="24">\u041C\u0430\u0442\u0441\u0442\u0430\u0442</div>
                <div class="tile red" data-id="38">\u0414\u0413\u041C\u0410</div>
                <div class="tile red" data-id="39">\u0422\u0424\u041A\u041F</div>
                <div class="tile red" data-id="40">\u041E\u0441\u043D\u043E\u0432\u044B \u0442\u0435\u043E\u0440\u0438\u0438 \u0438\u0433\u0440</div>
                <div class="tile red" data-id="37">\u0414\u0438\u0444\u0444\u0435\u0440\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F</div>
                <div class="tile red" data-id="41">\u0427\u0438\u0441\u043B\u0435\u043D\u043D\u044B\u0435 \u043C\u0435\u0442\u043E\u0434\u044B \u043C\u043E\u0434\u0435\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F</div>
            </div>
        </div>

        <div class="category">
            <h3 class="category-title">\u041F\u0418\u041D</h3>
            <div class="tiles-container">
                <div class="tile yellow" data-id="15">\u041F\u0440\u043E\u0433\u0430</div>
                <div class="tile yellow" data-id="16">\u0410\u043B\u0433\u043E\u0441\u044B</div>
                <div class="tile yellow" data-id="17">\u0418\u043D\u0444\u043E\u043A\u043E\u043C</div>
                <div class="tile yellow" data-id="19">\u041F\u0438\u0420\u0411\u0414</div>
                <div class="tile yellow" data-id="46">\u041E\u041E\u041F</div>
                <div class="tile yellow" data-id="53">\u041C\u0435\u0445\u0430\u043D\u0438\u043A\u0430</div>
                <div class="tile yellow" data-id="54">\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043C\u0430\u0433\u043D\u0435\u0442\u0438\u0437\u043C</div>
            </div>
        </div>

        <div class="category">
            <h3 class="category-title">\u0412\u0422</h3>
            <div class="tiles-container">
                <div class="tile purple" data-id="42">\u0414\u0438\u0441\u043A\u0440\u0435\u0442\u043A\u0430 (\u0431\u0430\u0437\u0430\xB3)</div>
                <div class="tile purple" data-id="43">\u0414\u0438\u0441\u043A\u0440\u0435\u0442\u043A\u0430 (\u043F\u0440\u043E\u0434)</div>
                <div class="tile purple" data-id="45">\u0412\u044B\u0447\u041C\u0430\u0442</div>
                <div class="tile purple" data-id="56">\u041C\u0435\u0442\u041E\u043F\u0442\u044B</div>
                <div class="tile purple" data-id="33">\u041E\u041F\u0414</div>
                <div class="tile purple" data-id="30">\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435</div>
                <div class="tile purple" data-id="29">\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0442\u0438\u043A\u0430</div>
                <div class="tile purple" data-id="31">\u0411\u0414</div>
                <div class="tile purple" data-id="34">\u042F\u041F\u044B</div>
                <div class="tile purple" data-id="27">WEB</div>
                <div class="tile purple" data-id="32">\u0410\u041A</div>
                <div class="tile purple" data-id="26">\u0418\u0411</div>
                <div class="tile purple" data-id="28">\u041E\u041F\u0418</div>
                <div class="tile purple" data-id="44">\u0410\u0438\u0421\u0414</div>
                <div class="tile purple" data-id="52">\u0420\u0411\u0414\u0438\u041F</div>
                <div class="tile purple" data-id="208">\u0424\u041F</div>
                <div class="tile purple" data-id="209">\u041E\u0421\u0438</div>
                <div class="tile purple" data-id="210">\u0411\u041B\u041F\u0421</div>
                <div class="tile purple" data-id="204">\u0421\u0438\u0441\u0418\u0441\u043A\u0418</div>
            </div>
        </div>

        <div class="category">
            <h3 class="category-title">\u0418\u0441\u0442\u043E\u0440\u0438\u044F</h3>
            <div class="tiles-container">
                <div class="tile blue" data-id="8">\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0440\u0443\u0441\u0441\u043A\u043E\u0439 \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u044B \u0432 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0435 \u043C\u0438\u0440\u043E\u0432\u043E\u0439 \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u044B</div>
                <div class="tile blue" data-id="7">\u0420\u043E\u0441\u0441\u0438\u044F \u0432 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0445 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0439</div>
                <div class="tile blue" data-id="4">\u0420\u0435\u0444\u043E\u0440\u043C\u044B \u0438 \u0440\u0435\u0444\u043E\u0440\u043C\u0430\u0442\u043E\u0440\u044B \u0432 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u0420\u043E\u0441\u0441\u0438\u0438</div>
                <div class="tile blue" data-id="6">\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0440\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u043E\u0439 \u043D\u0430\u0443\u043A\u0438 \u0438 \u0442\u0435\u0445\u043D\u0438\u043A\u0438</div>
                <div class="tile blue" data-id="5">\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0420\u043E\u0441\u0441\u0438\u0438 \u0438 \u043C\u0438\u0440\u0430 \u0432 \u0425\u0425 \u0432\u0435\u043A\u0435</div>
                <div class="tile blue" data-id="3">\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0420\u043E\u0441\u0441\u0438\u0438</div>
            </div>
        </div>

        <div class="category">
            <h3 class="category-title">\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F? \u041F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F? \u0411\u0430\u0433\u0438?</h3>
            <a href="https://t.me/reviews_ext">\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 \u0434\u0438\u0440\u0435\u043A\u0442 \u043A\u0430\u043D\u0430\u043B\u0430</a> \u0438\u043B\u0438
            <a href="https://github.com/OneTwoZzzPlus/reviews/issues">\u0432 issues github</a>
        </div>
    `;
  }

  // src/ui/tabs/tabMenu.js
  function createMainPageFilling(isAuth3, isUserModerator2, logoutCallback3, loadReviewsCallback, openAddReviewCallback, openModeratorPanelCallback) {
    const wrapper = document.createElement("div");
    wrapper.appendChild(createMenu(
      isAuth3,
      isUserModerator2,
      logoutCallback3,
      openAddReviewCallback,
      openModeratorPanelCallback
    ));
    wrapper.appendChild(createContent(
      loadReviewsCallback
    ));
    return wrapper;
  }
  function createMenu(isAuth3, isUserModerator2, logoutCallback3, openAddReviewCallback, openModeratorPanelCallback) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("reviews-menu");
    const addReviewButton = document.createElement("button");
    addReviewButton.classList.add("reviews-menu-item");
    addReviewButton.innerHTML = menuAddReviewBtnLabel;
    addReviewButton.addEventListener("click", openAddReviewCallback);
    wrapper.appendChild(addReviewButton);
    if (isUserModerator2) {
      const myReviewButton = document.createElement("button");
      myReviewButton.classList.add("reviews-menu-item");
      myReviewButton.innerHTML = menuMyReviewBtnLabel;
      myReviewButton.addEventListener("click", openModeratorPanelCallback);
      wrapper.appendChild(myReviewButton);
    }
    if (isAuth3) {
      const logoutButton = document.createElement("button");
      logoutButton.classList.add("reviews-menu-item");
      logoutButton.innerHTML = menuLogoutBtnLabel;
      logoutButton.addEventListener("click", logoutCallback3);
      wrapper.appendChild(logoutButton);
    }
    return wrapper;
  }
  function createContent(loadReviewsCallback) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderMainPage();
    wrapper.addEventListener("click", (e) => {
      if (e.target.classList.contains("tile")) {
        const key = e.target.getAttribute("data-id");
        loadReviewsCallback("subject", key);
      }
    });
    return wrapper;
  }

  // src/ui/tabs/tabSearch.js
  function createSearch(data, callback, modeModerator2 = false) {
    const wrapper = document.createElement("div");
    wrapper.className = "search-list";
    data.results.forEach((s) => {
      const item = document.createElement("button");
      item.className = "search-item";
      item.innerHTML = `
            ${symbols[s.type] || ""}
            ${s.title}
            ${modeModerator2 && s.id !== null ? `<span class="search-id">(${s.id})</span>` : ""}
        `;
      item.addEventListener("click", async () => callback(s.id, s.type, s.title));
      wrapper.appendChild(item);
    });
    return wrapper;
  }

  // src/utils/utils.js
  function parseJwt(token) {
    try {
      const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const binary = atob(base64);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      const json = new TextDecoder("utf-8").decode(bytes);
      return JSON.parse(json);
    } catch (e) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0430\u0440\u0441\u0438\u043D\u0433\u0430 JWT", e);
      return null;
    }
  }
  function parseCommentDate(dateStr) {
    if (!dateStr) return -Infinity;
    const untilMatch = dateStr.toLowerCase().match(/^до\s+(\d{4})$/);
    if (untilMatch) {
      const [, year] = untilMatch;
      return new Date(
        Number(year),
        0,
        1,
        0,
        0
      ).getTime();
    }
    const match = dateStr.match(
      /(\d{2}):(\d{2})\s+(\d{2})\.(\d{2})\.(\d{4})/
    );
    if (!match) {
      return -Infinity;
    }
    const [, hh, mm, dd, MM, yyyy] = match;
    return new Date(
      Number(yyyy),
      Number(MM) - 1,
      Number(dd),
      Number(hh),
      Number(mm)
    ).getTime();
  }
  function setCookie(key, value, options = {}) {
    const {
      days = 1,
      path = "/",
      sameSite = "Lax",
      secure = false
    } = options;
    let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    if (days) {
      cookie += `; max-age=${days * 86400}`;
    }
    cookie += `; path=${path}`;
    cookie += `; SameSite=${sameSite}`;
    if (secure) {
      cookie += "; Secure";
    }
    document.cookie = cookie;
  }
  function getCookie(key) {
    const match = document.cookie.split("; ").find((row) => row.startsWith(encodeURIComponent(key) + "="));
    return match ? decodeURIComponent(match.split("=")[1]) : null;
  }
  function normalizeString(str) {
    if (typeof str !== "string") return "";
    return str.normalize("NFKC").replace(/[\s\uFEFF\xA0]+/g, " ").trim();
  }
  function getNonNegativeInt(str) {
    if (/^\d+$/.test(str)) {
      return parseInt(str, 10);
    }
    return null;
  }

  // src/api/authp.js
  var isExtension = false;
  var refreshToken = null;
  var accessToken = null;
  var accessTokenExpiration = 0;
  var TIMEOUT = 300;
  function isAuth() {
    return refreshToken !== null;
  }
  function setTokens(rToken, aToken) {
    refreshToken = rToken;
    accessToken = aToken;
    const payload = parseJwt(accessToken);
    if (payload?.exp) accessTokenExpiration = payload.exp || 0;
  }
  function isAccessTokenExpired() {
    return Date.now() >= accessTokenExpiration * 1e3 - TIMEOUT * 1e3;
  }
  function validateTokenISU(aToken) {
    const payload = parseJwt(aToken);
    if (!payload?.isu) {
      console.error("[AUTHP] isu not found");
      return false;
    }
    return true;
  }
  function saveTokensExtension(rToken, aToken) {
    isExtension = true;
    if (!chrome.runtime?.id) return;
    chrome.storage.local.set({ refresh_token: rToken, access_token: aToken }, () => {
      const err = chrome.runtime.lastError;
      if (err && !err.message.includes("Extension context invalidated")) {
        console.error(err);
      } else {
        setTokens(rToken, aToken);
      }
    });
  }
  function resetTokensExtension() {
    isExtension = true;
    chrome.storage.local.remove(["refresh_token", "access_token"]);
    refreshToken = null;
    accessToken = null;
    accessTokenExpiration = 0;
  }
  function saveTokensPage(rToken, aToken) {
    isExtension = false;
    setCookie("refresh_token", rToken, { secure: false });
    setCookie("access_token", aToken, { secure: false });
    setTokens(rToken, aToken);
  }
  function loadTokensPage() {
    isExtension = false;
    return new Promise((resolve, reject) => {
      const rToken = getCookie("refresh_token");
      const aToken = getCookie("access_token");
      if (rToken && aToken) {
        setTokens(rToken, aToken);
        const payloadAT = parseJwt(aToken);
        if (payloadAT) resolve(payloadAT);
        else reject();
      } else reject();
    });
  }
  function resetTokensPage() {
    isExtension = false;
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    refreshToken = null;
    accessToken = null;
    accessTokenExpiration = 0;
  }
  function saveTokensAuto(rToken, aToken) {
    if (isExtension) saveTokensExtension(rToken, aToken);
    else saveTokensPage(rToken, aToken);
  }
  function resetTokensAuto() {
    if (isExtension) resetTokensExtension();
    else resetTokensPage();
  }

  // src/api/api.js
  async function fetchJSON(method, path, options = {}, controller = null) {
    const hasOptions = Object.keys(options).length > 0;
    const url = new URL(path, "https://onetwozzzplus.work.gd/");
    const fetchOptions = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller?.signal
    };
    if (refreshToken) {
      try {
        if (!accessToken || isAccessTokenExpired()) {
          const urlRefresh = new URL("/authp/notify", "https://onetwozzzplus.work.gd/");
          const resp = await fetch(urlRefresh, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "refresh_token": refreshToken })
          });
          if (resp.ok) {
            const res = await resp.json();
            const aToken = res?.access_token;
            if (aToken && validateTokenISU(aToken)) {
              saveTokensAuto(refreshToken, aToken);
            } else {
              console.error("[API] Invalid token in notify response");
              resetTokensAuto();
            }
          } else {
            console.error("[API] Refresh failed with status:", resp.status);
            resetTokensAuto();
          }
        }
        if (accessToken) {
          fetchOptions.headers["token"] = accessToken;
        }
      } catch (err) {
        console.error("[API] Unable to notify the token", err);
      }
    }
    if (fetchOptions.method === "GET") {
      Object.entries(options).forEach(([key, value]) => {
        url.searchParams.set(key, value.toString());
      });
    } else {
      fetchOptions.body = JSON.stringify(options);
    }
    return new Promise((resolve, reject) => {
      fetch(url, fetchOptions).then(async (res) => {
        if (res.ok) {
          const text = await res.text();
          resolve(text ? JSON.parse(text) : {});
        } else {
          const errorDetail = await res.json().catch(() => ({}));
          if (res.status === 401 || res.status === 404) {
          } else {
            console.error("[API] error details:", errorDetail);
          }
          reject(res.status);
        }
      }).catch((err) => {
        if (err.name !== "AbortError") {
          console.error("[API] network error:", err);
          reject(0);
        } else {
        }
      });
    });
  }
  async function fetchSearch(query, controller, strainer = null) {
    const options = strainer === null ? { "query": query } : { "query": query, "strainer": strainer };
    return await fetchJSON("GET", "/search", options, controller);
  }
  async function fetchTeacher(id) {
    return await fetchJSON("GET", `/teacher/${id}`, {});
  }
  async function fetchSubject(id) {
    return await fetchJSON("GET", `/subject/${id}`, {});
  }
  async function fetchTeacherRate(id, user_rating) {
    return await fetchJSON("POST", `/teacher/${id}/rate`, { "user_rating": user_rating });
  }
  async function fetchCommentVote(id, user_karma) {
    return await fetchJSON("POST", `/comment/${id}/vote`, { "user_karma": user_karma });
  }
  async function fetchSendSuggestion(body) {
    return await fetchJSON("POST", `/suggestion`, body);
  }
  async function fetchAuthPLogin(username, password) {
    return await fetchJSON("POST", `/authp/login`, { "username": username, "password": password });
  }
  async function fetchIsModerator() {
    return await fetchJSON("GET", `/mod`);
  }
  async function fetchGetSuggestionList() {
    return await fetchJSON("GET", `/mod/suggestion`);
  }
  async function fetchGetSuggestion(id) {
    return await fetchJSON("GET", `/mod/suggestion/${id}`);
  }
  async function fetchCommitSuggestion(id, body) {
    return await fetchJSON("POST", `/mod/suggestion/${id}/commit`, body);
  }
  async function fetchCancelSuggestion(id, status = "rejected") {
    return await fetchJSON("POST", `/mod/suggestion/${id}/cancel`, { "status": status });
  }
  async function fetchUpsertTeacher(body) {
    return await fetchJSON("POST", `/mod/teacher`, body);
  }
  async function fetchUpsertSubject(body) {
    return await fetchJSON("POST", `/mod/subject`, body);
  }
  async function fetchInsertComment(body) {
    return await fetchJSON("POST", `/mod/comment`, body);
  }
  async function fetchGSParser() {
    return await fetchJSON("GET", `/mod/gsparser`);
  }

  // src/ui/tabs/reviews/reviewsComments.js
  function createComments(commentsData, isAuth3) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("comments-wrap");
    let commentsList = createCommentsList(commentsData, isAuth3);
    if (commentsData.length > 1) {
      const dropdown = createDropdown(commentsData);
      dropdown.addEventListener("change", (event) => {
        const model = parseInt(event.target.value);
        const newCL = createCommentsList(commentsData, isAuth3, model);
        wrapper.replaceChild(newCL, commentsList);
        commentsList = newCL;
      });
      wrapper.appendChild(dropdown);
    }
    wrapper.appendChild(commentsList);
    return wrapper;
  }
  function createCommentsList(commentsData, isAuth3, model = 0) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("comments");
    const sortedCommentsData = sortComments(commentsData, model);
    sortedCommentsData.map((cData) => wrapper.append(createComment(cData, isAuth3)));
    return wrapper;
  }
  function createComment(comment, isAuth3) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("comment");
    wrapper.innerHTML = `
        <div class="comment-head">
            \u041E\u0442\u0437\u044B\u0432 ${comment.date}
            ${comment?.subject ? ` \u043F\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0443 "${comment.subject.title}"` : " "}
            ${comment?.source ? ` \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A "<a href="${comment.source.link ?? ""}">${comment.source.title}</a>"` : ""}
        </div>
        <div>${comment.text}</div>
    `;
    wrapper.appendChild(createKarma(comment.id, comment.karma, comment.user_karma, isAuth3));
    return wrapper;
  }
  function createKarma(id, karma, user_karma, isAuth3) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("karma");
    const karmaSpan = document.createElement("span");
    karmaSpan.classList.add("karma-value");
    const upBtn = document.createElement("button");
    upBtn.classList.add("karma-btn");
    const downBtn = document.createElement("button");
    downBtn.classList.add("karma-btn");
    if (isAuth3) {
      let isFetched = false;
      upBtn.addEventListener("click", async (_event) => {
        if (isFetched) return;
        try {
          isFetched = true;
          const data = await fetchCommentVote(id, user_karma === 1 ? 0 : 1);
          user_karma = data.user_karma;
          karma = data.karma;
          updateKarma(karmaSpan, upBtn, downBtn, karma, user_karma);
        } finally {
          isFetched = false;
        }
      });
      downBtn.addEventListener("click", async (_event) => {
        if (isFetched) return;
        try {
          const data = await fetchCommentVote(id, user_karma === -1 ? 0 : -1);
          user_karma = data.user_karma;
          karma = data.karma;
          updateKarma(karmaSpan, upBtn, downBtn, karma, user_karma);
        } finally {
          isFetched = false;
        }
      });
    } else {
      upBtn.disabled = true;
      downBtn.disabled = true;
    }
    updateKarma(karmaSpan, upBtn, downBtn, karma, user_karma);
    wrapper.appendChild(upBtn);
    wrapper.appendChild(karmaSpan);
    wrapper.appendChild(downBtn);
    return wrapper;
  }
  function updateKarma(karmaSpan, upBtn, downBtn, karma, user_karma) {
    if (user_karma === null || user_karma === void 0) user_karma = 0;
    karmaSpan.innerHTML = karma;
    upBtn.innerHTML = user_karma === 1 ? "\u25B2" : "\u25B3";
    downBtn.innerHTML = user_karma === -1 ? "\u25BC" : "\u25BD";
  }
  function createDropdown() {
    const wrapper = document.createElement("select");
    wrapper.name = "sort";
    wrapper.classList.add("comments-dropdown");
    wrapper.innerHTML = `
        <option value="0">C \u0432\u044B\u0441\u043E\u043A\u043E\u0439 \u043A\u0430\u0440\u043C\u044B</option>
        <option value="1">\u0421 \u043D\u0438\u0437\u043A\u043E\u0439 \u043A\u0430\u0440\u043C\u044B</option>
        <option value="2">\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u043E\u0432\u044B\u0435</option>
        <option value="3">\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0442\u0430\u0440\u044B\u0435</option>`;
    return wrapper;
  }
  function sortComments(comments, model = 0) {
    return [...comments].sort((a, b) => {
      const timeA = parseCommentDate(a.date);
      const timeB = parseCommentDate(b.date);
      let diff;
      switch (model) {
        case 0:
          diff = b.karma - a.karma;
          if (diff === 0) {
            if (Number.isNaN(timeA) || Number.isNaN(timeB)) return 0;
            else return timeB - timeA;
          }
          return diff;
        case 1:
          diff = a.karma - b.karma;
          if (diff === 0) {
            if (Number.isNaN(timeA) || Number.isNaN(timeB)) return 0;
            else return timeB - timeA;
          }
          return diff;
        case 2:
          if (Number.isNaN(timeA) || Number.isNaN(timeB)) return 0;
          else return timeB - timeA;
        case 3:
          if (Number.isNaN(timeA) || Number.isNaN(timeB)) return 0;
          else return timeA - timeB;
        default:
          return 0;
      }
    });
  }

  // src/ui/tabs/reviews/reviewsRating.js
  function createRating(id, rating, user_rating, isAuth3) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("rating-box");
    wrapper.innerHTML = renderRating(id, rating, user_rating, isAuth3);
    let isFetched = false;
    wrapper.addEventListener("change", async (event) => {
      if (event.target.name === `rating-${id}`) {
        if (isFetched) return;
        const newRate = parseInt(event.target.value);
        try {
          isFetched = true;
          const data = await fetchTeacherRate(id, newRate);
          wrapper.innerHTML = renderRating(id, data.rating, data.user_rating, isAuth3);
        } finally {
          isFetched = false;
        }
      }
    });
    return wrapper;
  }
  function renderRating(id, rating, user_rating, isAuth3) {
    if (user_rating === null || user_rating === void 0) user_rating = 0;
    const stars = [5, 4, 3, 2, 1].map((num) => `
        <input type="radio" 
            id="rate-${id}-${num}" 
            name="rating-${id}" 
            value="${num}" 
            ${user_rating === num ? "checked" : ""}
            ${isAuth3 ? "" : "disabled"}>
        <label for="rate-${id}-${num}">\u2605</label>
    `).join("");
    return `
        <div class="rating-row">
            <span class="rating-title">\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430:</span>
            <span class="rating-value">${rating}</span>
        </div>
        <div class="rating-row">
            <span class="rating-title">\u0412\u0430\u0448\u0430 \u043E\u0446\u0435\u043D\u043A\u0430:</span>
            <div class="rating">${stars}</div>
        </div>
    `;
  }

  // src/ui/tabs/reviews/reviewsSummaries.js
  function createSummaries(summariesData) {
    const summariesHTML = summariesData.map((item) => `
        <div class="summary">
            <span class="summary-title">${item.title ?? ""}</span>: 
            <span class="summary-value">${item.value ?? ""}</span>
        </div>
    `).join("");
    const summaries = document.createElement("div");
    summaries.classList.add("summaries");
    summaries.innerHTML = summariesHTML;
    return summaries;
  }

  // src/ui/tabs/reviews/reviewsContentBox.js
  function createReviewsContentBox(data, isAuth3) {
    if (!data || !Array.isArray(data.summaries) || !Array.isArray(data.comments)) return null;
    const wrapper = document.createElement("div");
    wrapper.classList.add("reviews-content-box");
    wrapper.appendChild(createRating(data.id, data.rating, data?.user_rating, isAuth3));
    if (data.summaries.length !== 0) {
      wrapper.appendChild(createSummaries(data.summaries));
    }
    if (data.comments.length !== 0) {
      wrapper.appendChild(createComments(data.comments, isAuth3));
    }
    if (data.summaries.length === 0 && data.comments.length === 0) {
      const comment = document.createElement("p");
      comment.classList.add("comment");
      comment.innerHTML = emptyCommentsList;
      wrapper.appendChild(comment);
    }
    return wrapper;
  }

  // src/ui/tabs/tabTeacher.js
  function createTeacher(data, isAuth3) {
    const reviewBox = createReviewsContentBox(data, isAuth3);
    if (reviewBox === null) return null;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<h2>${data.name}</h2>`;
    wrapper.appendChild(reviewBox);
    return wrapper;
  }

  // src/ui/tabs/tabSubject.js
  function createSubject(data, isAuth3) {
    if (!data || !Array.isArray(data.teachers)) return null;
    data.teachers.sort((a, b) => {
      const getLatestTime = (item) => {
        if (!item.comments || item.comments.length === 0) return 0;
        return item.comments.reduce((max, c) => {
          const current = getNonNegativeInt(parseCommentDate(c.date));
          return current > max ? current : max;
        }, 0);
      };
      const timeA = getLatestTime(a);
      const timeB = getLatestTime(b);
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      const rating = b.rating - a.rating;
      if (rating !== 0) return rating;
      return b.id - a.id;
    });
    const reviewBoxes = data.teachers.map((teacher) => createReviewsContentBox(teacher, isAuth3));
    if (reviewBoxes.some((box) => box === null)) return null;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<h2>${data.title}</h2>`;
    data.teachers.forEach((teacher, i) => {
      const box = document.createElement("details");
      box.innerHTML = `<summary class="reviews-title">${teacher.name}</summary>`;
      box.appendChild(reviewBoxes[i]);
      wrapper.appendChild(box);
    });
    return wrapper;
  }

  // src/ui/tabs/tabLogin.js
  function createLoginForm(loginCallback3) {
    const form = document.createElement("form");
    form.classList.add("login-form");
    form.innerHTML = `
        <p>${authpLabel}</p>
    
        <input type="email" name="email" placeholder="E-mail" required />
        <input type="password" name="password" placeholder="\u041F\u0430\u0440\u043E\u043B\u044C" required />
    
        <button id="authp-login" type="submit">\u0412\u0445\u043E\u0434</button>
    `;
    const loginButton = form.querySelector("#authp-login");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      loginButton.disabled = true;
      loginButton.innerHTML = loginLoadingBtnLabel;
      fetchAuthPLogin(form.email.value, form.password.value).then((resp) => {
        const rToken = resp?.refresh_token;
        const aToken = resp?.access_token;
        if (!rToken || !aToken) {
          console.error("[AUTHP] Invalid response", resp);
          loginButton.disabled = false;
          loginButton.innerHTML = loginBtnLabel;
          return;
        }
        if (!validateTokenISU(aToken)) return;
        saveTokensPage(rToken, aToken);
        loginCallback3();
      }).catch((status) => {
        if (status === 401) {
          alert(authpCredentials);
        } else alert(authpError + ` (\u0441\u0442\u0430\u0442\u0443\u0441 ${status})`);
        loginButton.disabled = false;
        loginButton.innerHTML = loginBtnLabel;
      });
    });
    return form;
  }

  // src/ui/tabs/creation/renderReviewForm.js
  var MAX_INPUT = 64;
  var MAX_TEXTAREA = 1e4;
  function getElements(root) {
    return {
      teacher: {
        input: root.querySelector("#addrev-teacher-input"),
        reset: root.querySelector("#addrev-teacher-input-reset"),
        container: root.querySelector("#addrev-teacher-container"),
        status: root.querySelector("#addrev-teacher-status")
      },
      subject: {
        input: root.querySelector("#addrev-subject-input"),
        reset: root.querySelector("#addrev-subject-input-reset"),
        container: root.querySelector("#addrev-subject-container"),
        status: root.querySelector("#addrev-subject-status")
      },
      subs: {
        input: root.querySelector("#addrev-sub-input"),
        reset: root.querySelector("#addrev-sub-input-reset"),
        container: root.querySelector("#addrev-sub-container"),
        status: root.querySelector("#addrev-sub-status")
      },
      comment: {
        input: root.querySelector("#addrev-comment-input"),
        counter: root.querySelector("#addrev-comment-char-count")
      },
      submit: root.querySelector("#addrev-submit"),
      cancel: root.querySelector("#addrev-cancel"),
      exit: root.querySelector("#addrev-exit"),
      spam: root.querySelector("#addrev-spam"),
      ext: {
        source: root.querySelector("#addrev-source"),
        date: root.querySelector("#addrev-date")
      }
    };
  }
  function renderAddReviewForm(isUserModerator2, externalSource2 = false) {
    if (!isUserModerator2) externalSource2 = false;
    return `
        ${isUserModerator2 || externalSource2 ? `<button id="addrev-exit" class="rev-button-s">
            \u041E\u0442\u043C\u0435\u043D\u0430
        </button>` : ""}
        
        ${externalSource2 ? `<div class="mod-form" style="margin-top: 1rem;">
        <label for="addrev-source">ID \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430</label>
        <input type="text" id="addrev-source" class="mod-row mod-input" placeholder="source_id"/>

        <label for="addrev-date">\u0414\u0430\u0442\u0430</label>
        <input type="text" id="addrev-date" class="mod-row mod-input" placeholder="HH:MM DD.MM.YYYY"/>
        </div>` : ""}
        
        <p class="add-rev-label">* \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0433\u043E \u043E\u0442\u0437\u044B\u0432\u0430, \u0434\u043B\u044F \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F...</p>
        <div id="addrev-teacher-input-wrapper" class="rev-input-wrapper">
            <label for="addrev-teacher-input">\u0424\u0418\u041E \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F</label>
            <input type="text" id="addrev-teacher-input" class="rev-input" 
                placeholder="\u0418\u0432\u0430\u043D\u043E\u0432 \u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432\u0438\u0447" 
                maxlength="${MAX_INPUT}"/>
            <button type="reset" id="addrev-teacher-input-reset" class="rev-input-reset">&times;</button>
        </div>
        <div id="addrev-teacher-container"></div>
        <p id="addrev-teacher-status" class="add-rev-status">\u041D\u0438\u043A\u043E\u0433\u043E \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E</p>
        
        <p class="add-rev-label">* \u041F\u043E \u043A\u0430\u043A\u043E\u043C\u0443 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0443 \u0432\u044B \u0435\u0433\u043E \u0437\u043D\u0430\u0435\u0442\u0435? <i>(\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439)</i></p>
        <div id="addrev-subject-input-wrapper" class="rev-input-wrapper">
            <label for="addrev-subject-input">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430</label>
            <input type="text" id="addrev-subject-input" class="rev-input" 
            placeholder="\u041C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u043D\u0430\u043B\u0438\u0437" 
            maxlength="${MAX_INPUT}"/>
            <button type="reset" id="addrev-subject-input-reset" class="rev-input-reset">&times;</button>
        </div>
        <div id="addrev-subject-container"></div>
        <p id="addrev-subject-status" class="add-rev-status">\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E</p>
        
        <p class="add-rev-label">\u041A\u0430\u043A\u0438\u0435 \u0435\u0449\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u044B \u0432\u0435\u0434\u0435\u0442? <i>(\u041E\u0442\u043C\u0435\u0442\u044C\u0442\u0435, \u0435\u0441\u043B\u0438 \u0437\u043D\u0430\u0435\u0442\u0435)</i></p>
        <div id="addrev-sub-input-wrapper" class="rev-input-wrapper">
            <label for="addrev-sub-input">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430</label>
            <input type="text" id="addrev-sub-input" class="rev-input" 
                placeholder="\u0410\u043B\u0433\u0435\u0431\u0440\u0430" 
                maxlength="${MAX_INPUT}"/>
            <button type="reset" id="addrev-sub-input-reset" class="rev-input-reset">&times;</button>
        </div>
        <div id="addrev-sub-container"></div>
        <div id="addrev-sub-status">
            <p class="add-rev-status">\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E</p>
        </div>
                
        <p class="add-rev-label">
            * \u0427\u0442\u043E \u043C\u043E\u0436\u0435\u0442\u0435 \u043E \u043D\u0451\u043C \u0441\u043A\u0430\u0437\u0430\u0442\u044C? <br/>
            <i>\u041A\u0430\u043A \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u044C\u0441\u044F \u043A \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430\u043C? \u041A\u0430\u043A \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0451\u0442? \u0422\u0440\u0443\u0434\u043D\u043E \u043B\u0438 \u0437\u0430\u043A\u0440\u044B\u0442\u044C\u0441\u044F? \u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0443\u0440\u043E\u0432\u0435\u043D\u044C, \u0435\u0441\u043B\u0438 \u044D\u0442\u043E \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439.</i>
        </p>
        <div class="comment-textarea-wrapper">
            <label for="addrev-comment-input">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439</label>
            <textarea
                    id="addrev-comment-input"
                    class="comment-input"
                    placeholder="\u041C\u043E\u0436\u043D\u043E \u043F\u0438\u0441\u0430\u0442\u044C \u043A\u0440\u0430\u0442\u043A\u043E (\u043E\u0431\u044B\u0447\u043D\u043E \u043F\u0438\u0448\u0443\u0442 3\u20135 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439)..."
                    maxlength="${MAX_TEXTAREA}"
            ></textarea>
            <div class="comment-char-counter">
                <span id="addrev-comment-char-count">0</span>/${MAX_TEXTAREA}
            </div>
        </div>
        
        ${isUserModerator2 || externalSource2 ? `<button id="addrev-submit" class="rev-button">
            \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432
        </button>` : `<button id="addrev-submit" class="rev-button">
            \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0430\u043D\u043E\u043D\u0438\u043C\u043D\u044B\u0439 \u043E\u0442\u0437\u044B\u0432
        </button>`}
        
        ${isUserModerator2 && !externalSource2 ? `<button id="addrev-cancel" class="rev-button-s">
            \u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C (\u043D\u0430\u0440\u0443\u0448\u0430\u0435\u0442 \u043F\u0440\u0430\u0432\u0438\u043B\u0430)
        </button>` : `<button id="addrev-cancel" class="rev-button-s">
            \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C
        </button>`}
        
        ${isUserModerator2 && !externalSource2 ? `<button id="addrev-spam" class="rev-button-s">
            \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432 \u0441\u043F\u0430\u043C
        </button>` : ""}
    `;
  }

  // src/ui/tabs/tabAddReview.js
  var modeModerator = false;
  var externalSource = false;
  var isSent = false;
  var clearFormCallback = void 0;
  var emptyState = {
    id: null,
    teacher: {
      id: null,
      title: null
    },
    subject: {
      id: null,
      title: null
    },
    subs: /* @__PURE__ */ new Map(),
    comment: ""
  };
  var state = structuredClone(emptyState);
  function createAddReviewForm(clearFormCallbackLocal, data = null, isModeModerator = false, isExternalSource = false) {
    externalSource = isExternalSource ? isModeModerator : false;
    modeModerator = isModeModerator;
    clearFormCallback = clearFormCallbackLocal;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderAddReviewForm(modeModerator, externalSource);
    const root = getElements(wrapper);
    bindEvents(wrapper, root);
    if (data) {
      state.id = data.id;
      state.teacher.id = data.teacher.id || null;
      state.teacher.title = data.teacher.title;
      state.subject.id = data.subject.id || null;
      state.subject.title = data.subject.title;
      state.comment = data.text;
      state.subs = new Map(data.subs.map((item) => [item.title, { id: item.id || null, title: item.title }]));
    }
    refreshForm(root);
    return wrapper;
  }
  var inputState = {
    teacher: {
      type: "teacher",
      controller: void 0,
      timeout: void 0,
      value: ""
    },
    subject: {
      type: "subject",
      controller: void 0,
      timeout: void 0,
      value: ""
    },
    subs: {
      type: "subject",
      controller: void 0,
      timeout: void 0,
      value: ""
    }
  };
  function bindEvents(wrapper, root) {
    wrapper.addEventListener("click", (e) => {
      if (e.target === root.teacher.reset) {
        root.teacher.input.value = "";
        root.teacher.container.innerHTML = "";
      }
      if (e.target === root.subject.reset) {
        root.subject.input.value = "";
        root.subject.container.innerHTML = "";
      }
      if (e.target === root.subs.reset) {
        root.subs.input.value = "";
        root.subs.container.innerHTML = "";
      }
      if (e.target.classList.contains("rev-list-item-reset")) {
        const key = e.target.getAttribute("data-id");
        state.subs.delete(key);
        refreshList(root.subs, state.subs);
      }
      if (modeModerator) {
        if (externalSource) {
          if (e.target === root.submit) {
            addComment(root);
          }
        } else {
          if (e.target === root.submit) {
            commitSuggestion();
          }
          if (e.target === root.cancel) {
            rejectSuggestion("rejected");
          }
          if (e.target === root.spam) {
            rejectSuggestion("spam");
          }
        }
        if (e.target === root.exit) {
          state = structuredClone(emptyState);
          clearFormCallback();
        }
      } else {
        if (e.target === root.submit) {
          sendSuggestion();
        }
        if (e.target === root.cancel) {
          clearForm(root);
        }
      }
    });
    function inputEvent2(e) {
      if (e.target === root.comment.input) {
        state.comment = root.comment.input.value;
        const length = root.comment.input.value.length;
        root.comment.counter.textContent = length.toString();
        const exceeded = length >= MAX_TEXTAREA;
        root.comment.input.classList.toggle("limit-exceeded", exceeded);
        root.comment.counter.parentElement.classList.toggle("limit-exceeded", exceeded);
        const scrollY = window.scrollY;
        root.comment.input.style.height = "auto";
        root.comment.input.style.height = root.comment.input.scrollHeight + "px";
        window.scrollTo(window.scrollX, scrollY + 1e3);
      }
      if (e.target === root.teacher.input) {
        inputState.teacher.value = root.teacher.input.value;
        clearTimeout(inputState.teacher.timeout);
        inputState.teacher.timeout = setTimeout(
          () => {
            search(
              root.teacher,
              inputState.teacher,
              state.teacher,
              loadSingle
            );
          },
          300
        );
      }
      if (e.target === root.subject.input) {
        inputState.subject.value = root.subject.input.value;
        clearTimeout(inputState.subject.timeout);
        inputState.subject.timeout = setTimeout(
          () => {
            search(
              root.subject,
              inputState.subject,
              state.subject,
              loadSingle
            );
          },
          300
        );
      }
      if (e.target === root.subs.input) {
        inputState.subs.value = root.subs.input.value;
        clearTimeout(inputState.subs.timeout);
        inputState.subs.timeout = setTimeout(
          () => {
            search(
              root.subs,
              inputState.subs,
              state.subs,
              loadList
            );
          },
          300
        );
      }
    }
    wrapper.addEventListener("input", inputEvent2);
    wrapper.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        inputEvent2(event);
      }
    });
  }
  function addComment(root) {
    const source_id = getNonNegativeInt(normalizeString(root.ext.source.value));
    if (source_id === null) {
      alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 source_id");
      return;
    }
    const date = normalizeString(root.ext.date.value);
    if (date === "") {
      alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u0443\u044E \u0434\u0430\u0442\u0443");
      return;
    }
    if (state.teacher.id === null) {
      alert("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F");
      return;
    }
    if (state.subject.id === null) {
      alert("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043F\u0440\u0435\u0434\u043C\u0435\u0442");
      return;
    }
    if (normalizeString(state.comment).length === 0) {
      alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u043E\u0442\u0437\u044B\u0432\u0430");
      return;
    }
    const requestBody = {
      source_id,
      date,
      teacher: state.teacher,
      subject: state.subject,
      subs: Array.from(state.subs.values()),
      text: state.comment
    };
    if (isSent) return;
    isSent = true;
    fetchInsertComment(requestBody).then((data) => {
      alert(`\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E c id: ${data.id}`);
      state = structuredClone(emptyState);
      root.ext.date.value = "";
      refreshForm(root);
      isSent = false;
    }).catch((status) => {
      alert(`\u0421\u0435\u0440\u0432\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B ${status}`);
      isSent = false;
    });
  }
  function sendSuggestion() {
    if (state.teacher.title === null) {
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F =]");
      return;
    }
    if (state.subject.title === null) {
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043F\u0440\u0435\u0434\u043C\u0435\u0442 =]");
      return;
    }
    if (normalizeString(state.comment).length === 0) {
      alert("\u041D\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u043B\u0438 \u043C\u0430\u043B\u043E \u0432\u044B \u043D\u0430\u043F\u0438\u0441\u0430\u043B\u0438?)");
      return;
    }
    const requestBody = {
      teacher: state.teacher,
      subject: state.subject,
      subs: Array.from(state.subs.values()),
      text: state.comment
    };
    if (isSent) return;
    isSent = true;
    fetchSendSuggestion(requestBody).then((_) => {
      state = structuredClone(emptyState);
      alert("\u0421\u043F\u0430\u0441\u0438\u0431\u043E! \u041E\u0442\u0437\u044B\u0432 \u0431\u0443\u0434\u0435\u0442 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D \u043A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E\u0439\u0434\u0451\u0442 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044E =)");
      isSent = false;
      clearFormCallback();
    }).catch((status) => {
      alert(`\u0421\u0435\u0440\u0432\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B ${status}`);
      isSent = false;
    });
  }
  function commitSuggestion() {
    if (state.id === null) alert("Suggestion id \u043F\u0443\u0441\u0442\u043E\u0439!");
    if (state.teacher.id === null || state.teacher.id === void 0) {
      alert("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u0433\u043E \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F");
      return;
    }
    if (state.subject.id === null || state.subject.id === void 0) {
      alert("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043F\u0440\u0435\u0434\u043C\u0435\u0442");
      return;
    }
    for (let s in state.subs) {
      if (s.id === null || s.id === void 0) {
        alert("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u044B");
        return;
      }
    }
    if (normalizeString(state.comment).length === 0) {
      alert("\u041F\u0435\u0440\u0435\u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u043E\u0442\u0437\u044B\u0432\u0430, \u043E\u043D \u043F\u0443\u0441\u0442\u043E\u0439");
      return;
    }
    const requestBody = {
      teacher: state.teacher,
      subject: state.subject,
      subs: Array.from(state.subs.values()),
      text: state.comment
    };
    if (isSent) return;
    isSent = true;
    fetchCommitSuggestion(state.id, requestBody).then((_) => {
      state = structuredClone(emptyState);
      clearFormCallback();
      isSent = false;
    }).catch((status) => {
      alert(`\u0421\u0435\u0440\u0432\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B ${status}`);
      isSent = false;
    });
  }
  function rejectSuggestion(status) {
    if (state.id === null) alert("Suggestion id \u043F\u0443\u0441\u0442\u043E\u0439!");
    const confirmation = confirm(`\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432 (${status})?`);
    if (!confirmation) return;
    if (isSent) return;
    isSent = true;
    fetchCancelSuggestion(state.id, status).then((data) => {
      if (data.status !== status) {
        alert("\u0421\u0442\u0430\u0442\u0443\u0441 \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D");
        return;
      }
      clearFormCallback();
      isSent = false;
    }).catch((status2) => {
      alert(`\u0421\u0435\u0440\u0432\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B ${status2}`);
      isSent = false;
    });
  }
  function search(rootEl, is, s, load2) {
    if (!is.value || is.value.length < 3) return;
    is.controller?.abort();
    is.controller = new AbortController();
    fetchSearch(normalizeString(is.value), is.controller, is.type).then((data) => {
      rootEl.container.innerHTML = "";
      data.results.push({
        id: null,
        title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439",
        type: "add"
      });
      const searchBox = createSearch(data, (id, type, title) => {
        load2(rootEl, is, s, id, type, title);
      }, modeModerator);
      if (searchBox) rootEl.container.appendChild(searchBox);
      else rootEl.container.innerHTML = brokeSearchText;
    }).catch((status) => {
      rootEl.container.innerHTML = statusSearchText(status);
      if (status === 404) {
        const dt = {
          results: [{
            id: null,
            title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439",
            type: "add"
          }]
        };
        const searchBox = createSearch(dt, (id, type, title) => {
          load2(rootEl, is, s, id, type, title);
        }, modeModerator);
        if (searchBox) rootEl.container.appendChild(searchBox);
      }
    });
  }
  function loadSingle(rootEl, is, s, id, type, title) {
    rootEl.container.innerHTML = "";
    if (type !== is.type && type !== "add") return;
    if (type === "add") {
      const newTitle = normalizeString(is.value);
      if (newTitle.length === 0) return;
      s.id = null;
      s.title = newTitle;
    } else {
      s.id = id;
      s.title = title;
    }
    refreshSingle(rootEl, s);
  }
  function refreshSingle(rootEl, s) {
    if (s.title === null) {
      rootEl.status.innerHTML = `\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E`;
      return;
    }
    if (s.id === null) {
      rootEl.status.innerHTML = `\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u043D\u043E\u0432\u044B\u0439: <span class="normal-text">${s.title}</span>`;
    } else {
      rootEl.status.innerHTML = `
            \u0412\u044B\u0431\u0440\u0430\u043D: <span class="normal-text">${s.title} ${modeModerator ? `<b>(${s.id})</b>` : ""}</span>`;
    }
    rootEl.input.value = "";
    rootEl.input.placeholder = s.title;
  }
  function loadList(rootEl, is, s, id, type, title) {
    rootEl.container.innerHTML = "";
    if (type !== is.type && type !== "add") return;
    if (type === "add") {
      id = null;
      title = is.value;
    }
    s.set(title, {
      id,
      title
    });
    refreshList(rootEl, s);
  }
  function refreshList(rootEl, s) {
    if (s.size === 0) {
      rootEl.status.innerHTML = `<p class="add-rev-status">\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E</p>`;
      return;
    }
    const revList = document.createElement("div");
    revList.classList.add("rev-list");
    revList.innerHTML = `
        <div class="rev-list">
            <p class="rev-list-title">\u0412\u044B\u0431\u0440\u0430\u043D\u043E: </p>
            ${Array.from(s, ([title, item]) => `
                <div class="rev-list-item">
                    ${item.id === null ? `<span class="muted-text">(\u043D\u043E\u0432\u044B\u0439)</span>` : ""}
                    ${item.title}
                    ${modeModerator && item.id !== null ? `(<b>${item.id}</b>)` : ""}
                    <button class="rev-list-item-reset" data-id="${title}">&times;</button>
                </div>
            `).join("")}
        </div>
    `;
    rootEl.status.innerHTML = "";
    rootEl.status.appendChild(revList);
  }
  function refreshComment(rootEl, s) {
    rootEl.input.value = s;
  }
  function clearForm(root) {
    state = structuredClone(emptyState);
    refreshForm(root);
  }
  function refreshForm(root) {
    refreshSingle(root.teacher, state.teacher);
    refreshSingle(root.subject, state.subject);
    refreshList(root.subs, state.subs);
    refreshComment(root.comment, state.comment);
  }

  // src/ui/tabs/tabListReviews.js
  function createListReviewsForm(callback, data) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("suggestions-list");
    data.items.forEach((s) => {
      const item = document.createElement("div");
      item.className = "suggestions-list-item";
      item.innerHTML = `
            \u041E\u0442\u0437\u044B\u0432 <b>\u2116${s.id}</b> \u043E\u0442 <b>${suggestionSource[s.source_id ?? 0] ?? "n/a"}</b> \u0432 \u0441\u0442\u0430\u0442\u0443\u0441\u0435 
            <b>${suggestionStatus[s.status] ?? "\u043D\u0435\u043F\u043E\u043D\u044F\u0442\u043D\u043E\u043C"}</b> </br>
            <span class="muted-text">${s.title}</span>
        `;
      item.addEventListener("click", async () => callback(s.id));
      wrapper.appendChild(item);
    });
    return wrapper;
  }

  // src/ui/tabs/creation/renderModUpdateForm.js
  function getElements2(root) {
    return {
      teacher: {
        id: root.querySelector("#mod-teacher-id"),
        title: root.querySelector("#mod-teacher-title"),
        form: root.querySelector("#mod-teacher-form")
      },
      subject: {
        id: root.querySelector("#mod-subject-id"),
        title: root.querySelector("#mod-subject-title"),
        checkbox: root.querySelector("#mod-subject-checkbox"),
        form: root.querySelector("#mod-subject-form")
      }
    };
  }
  function renderUpdateForm() {
    return `<details>
        <summary>\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F</summary>
        <form class="mod-form" id="mod-teacher-form">
            <label for="mod-teacher-id">\u0418\u0421\u0423</label>
            <input type="text" id="mod-teacher-id" class="mod-row mod-input" placeholder="XXXXXX"/>

            <label for="mod-teacher-title">\u0424\u0418\u041E</label>
            <input type="text" id="mod-teacher-title" class="mod-row mod-input" placeholder="\u0424\u0418\u041E"/>

            <button type="submit" id="mod-teacher-submit" class="mod-row rev-button-s">\u0417\u0430\u0434\u0430\u0442\u044C</button>
        </form>
    </details>

    <details>
        <summary>\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430</summary>
        <form class="mod-form" id="mod-subject-form">
            <div class="mod-form-group">
                <label for="mod-subject-checkbox">\u043D\u043E\u0432\u044B\u0439</label>
                <input type="checkbox" id="mod-subject-checkbox"/>

                <label for="mod-subject-id">ID</label>
                <input type="text" id="mod-subject-id" class="mod-input" placeholder="\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439" disabled/>
            </div>

            <label for="mod-subject-title">\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</label>
            <input type="text" id="mod-subject-title" class="mod-row mod-input" placeholder="\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435"/>

            <button type="submit" id="mod-subject-submit" class="mod-row rev-button-s">\u0417\u0430\u0434\u0430\u0442\u044C</button>
        </form>
    </details>`;
  }

  // src/ui/tabs/tabModUpdate.js
  function createUpdateForm() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("suggestions-list-item");
    wrapper.innerHTML = renderUpdateForm();
    const root = getElements2(wrapper);
    bindEvents2(wrapper, root);
    return wrapper;
  }
  function bindEvents2(wrapper, root) {
    wrapper.addEventListener("input", (e) => {
      if (e.target === root.subject.checkbox) {
        if (root.subject.checkbox.checked) {
          root.subject.id.placeholder = "id";
          root.subject.id.disabled = false;
        } else {
          root.subject.id.value = "";
          root.subject.id.placeholder = "\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439";
          root.subject.id.disabled = true;
        }
      }
    });
    let isTeacherSent = false;
    let isSubjectSent = false;
    wrapper.addEventListener("submit", (e) => {
      if (e.target === root.teacher.form) {
        e.preventDefault();
        const data = {
          id: getNonNegativeInt(normalizeString(root.teacher.id.value)),
          title: normalizeString(root.teacher.title.value)
        };
        if (data.id === null) {
          alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0418\u0421\u0423 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F");
          return;
        }
        if (data.title === "") {
          alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0424\u0418\u041E \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F");
          return;
        }
        if (isTeacherSent) return;
        isTeacherSent = true;
        fetchUpsertTeacher(data).then((data2) => {
          alert(`\u041E\u0431\u043D\u043E\u0432\u043B\u0451\u043D \u0441 id: ${data2.id}`);
          e.target.reset();
          isTeacherSent = false;
        }).catch((status) => {
          alert(`\u0421\u0435\u0440\u0432\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B ${status}`);
          isTeacherSent = false;
        });
      }
      if (e.target === root.subject.form) {
        e.preventDefault();
        const data = { id: null, title: "" };
        if (root.subject.checkbox.checked) {
          data.id = getNonNegativeInt(normalizeString(root.subject.id.value));
          data.title = normalizeString(root.subject.title.value);
          if (data.id === null) {
            alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 ID \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430");
            return;
          }
          if (data.title === "") {
            alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430");
            return;
          }
        } else {
          data.id = null;
          data.title = normalizeString(root.subject.title.value);
          if (data.title === "") {
            alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0433\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430");
            return;
          }
        }
        if (isSubjectSent) return;
        isSubjectSent = true;
        fetchUpsertSubject(data).then((data2) => {
          alert(`\u041E\u0431\u043D\u043E\u0432\u043B\u0451\u043D \u0441 id: ${data2.id}`);
          e.target.reset();
          isSubjectSent = false;
        }).catch((status) => {
          alert(`\u0421\u0435\u0440\u0432\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B ${status}`);
          isSubjectSent = false;
        });
      }
    });
  }

  // src/ui/router.js
  var route_default = { handle: "/", params: {}, render: () => {
  } };
  var listeners = [];
  var routes = [];
  function getPath() {
    return location.hash.slice(1) || "/";
  }
  function compileRoute(handle) {
    const regexString = handle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\\{(\w+)\\}/g, "(?<$1>[^/]+)");
    const regex = new RegExp(`^${regexString}$`);
    return (path) => {
      const match = path.match(regex);
      return match ? { ...match.groups } : null;
    };
  }
  function matchRoute() {
    const path = getPath();
    for (const route of routes) {
      const params = route.extractParams(path);
      if (params !== null) {
        return {
          handle: path,
          params: { ...params, ...route.params },
          render: route.render
        };
      }
    }
    return route_default;
  }
  function notify() {
    const route = matchRoute();
    for (const listener of listeners) listener(route.params);
    route.render(route.params);
  }
  window.addEventListener("hashchange", notify);
  var router = {
    init(handle, params, render) {
      const extractParams = compileRoute(handle);
      route_default = {
        handle,
        params,
        render,
        extractParams
      };
      routes.push(route_default);
    },
    subscribe(listener) {
      listeners.push(listener);
    },
    route(handle, params, render) {
      const extractParams = compileRoute(handle);
      routes.push({
        handle: handle || route_default.handle,
        params: params || route_default.params,
        render: render || route_default.render,
        extractParams
      });
    },
    start() {
      if (!location.hash) location.hash = route_default.handle;
      notify();
    },
    go(path) {
      location.hash = path;
    },
    notify,
    getPath
  };

  // src/ui/main.js
  var header;
  var isuBox;
  var container;
  var statusBox;
  var input;
  var inputReset;
  var menuBtn;
  var overlay;
  var loginCallback = void 0;
  var logoutCallback = void 0;
  var isAuth2 = false;
  var isUserModerator = false;
  var timeoutId;
  var abortController;
  function createMainPage(logoutCallbackLocal, loginCallbackLocal = void 0) {
    loginCallback = loginCallbackLocal;
    logoutCallback = logoutCallbackLocal;
    statusBox = document.querySelector("#reviews-status-box");
    isuBox = document.querySelector("#reviews-isu-box");
    container = document.querySelector("#reviews-container");
    input = document.querySelector("#reviews-input");
    inputReset = document.querySelector("#reviews-input-reset");
    menuBtn = document.querySelector("#reviews-menu");
    header = document.querySelector("#reviews-header");
    overlay = document.querySelector("#reviews-search-overlay");
    menuBtn.addEventListener("click", () => {
      router.go("/");
    });
    input.addEventListener("input", inputEvent);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        inputEvent();
      }
    });
    inputReset.addEventListener("click", () => {
      overlay.innerHTML = "";
      input.value = "";
      input.focus();
    });
    router.init("/", mainHeader, clearMainPage);
    router.subscribe((params) => {
      statusBox.innerHTML = "";
      container.innerHTML = "";
      overlay.innerHTML = "";
      header.innerHTML = params.header || mainHeader;
    });
    router.route("/login", { header: loginHeader }, openLoginForm);
    router.route("/suggestion", { header: addHeader }, openAddReview);
    router.route("/moderation", { header: moderationHeader }, openModeratorPanel);
    router.route("/moderation/suggestion", { header: moderationHeader }, openExternalReview);
    router.route("/moderation/suggestion/{id}", { header: moderationHeader }, openModerationReview);
    router.route("/{type}/{id}", { header: mainHeader }, load);
    router.start();
  }
  function clearMainPage() {
    container.appendChild(createMainPageFilling(
      isAuth2,
      isUserModerator,
      logoutCallback,
      (type, id) => router.go(`/${type}/${id}`),
      () => router.go("/suggestion"),
      () => router.go("/moderation")
    ));
  }
  function openLoginForm() {
    container.appendChild(createLoginForm(loginCallback));
  }
  function resolveLogin(payload) {
    isAuth2 = true;
    isuBox.innerHTML = authStatusText(payload?.isu, payload?.name);
    if (loginCallback !== void 0) isuBox.removeEventListener("click", () => router.go("/login"));
    router.notify();
    fetchIsModerator().then((data) => {
      if (data?.access) {
        isUserModerator = true;
        console.log("You are moderator!");
        router.notify();
      }
    }).catch(() => {
    });
  }
  function rejectLogin(isuBoxHTML2) {
    isAuth2 = false;
    isUserModerator = false;
    isuBox.innerHTML = isuBoxHTML2;
    if (loginCallback !== void 0) {
      isuBox.removeEventListener("click", () => {
        router.go("/login");
      });
      isuBox.addEventListener("click", () => {
        router.go("/login");
      });
    }
    router.notify();
  }
  function inputEvent() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(search2, 300);
  }
  async function search2() {
    const name = input.value.trim();
    if (!name) {
      overlay.innerHTML = "";
      return;
    }
    if (name.length < 3) {
      overlay.innerHTML = fewCharactersText;
      return;
    }
    overlay.innerHTML = loadingText;
    abortController?.abort();
    abortController = new AbortController();
    fetchSearch(name, abortController).then((data) => {
      if (data.results.length === 0) {
        overlay.innerHTML = statusSearchText(404);
        return;
      }
      const searchBox = createSearch(
        data,
        (id, type) => router.go(`/${type}/${id}`),
        isUserModerator
      );
      if (searchBox) {
        overlay.innerHTML = "";
        overlay.appendChild(searchBox);
      } else {
        overlay.innerHTML = brokeSearchText;
      }
    }).catch((status) => {
      overlay.innerHTML = statusSearchText(status);
    });
  }
  async function load(params) {
    statusBox.innerHTML = loadingText;
    switch (params.type) {
      case "teacher":
        fetchTeacher(params.id).then((data) => {
          const teacher = createTeacher(data, isAuth2);
          if (teacher !== null) {
            statusBox.innerHTML = "";
            container.innerHTML = "";
            container.appendChild(teacher);
            return;
          }
          statusBox.innerHTML = brokeReviewsText;
        }).catch((status) => {
          statusBox.innerHTML = statusReviewsText(status);
        });
        break;
      case "subject":
        fetchSubject(params.id).then((data) => {
          const subject = createSubject(data, isAuth2);
          if (subject !== null) {
            statusBox.innerHTML = "";
            container.innerHTML = "";
            container.appendChild(subject);
            return;
          }
          statusBox.innerHTML = brokeReviewsText;
        }).catch((status) => {
          statusBox.innerHTML = statusReviewsText(status);
        });
        break;
      default:
        console.error(`\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 type ${params.type}`);
        statusBox.innerHTML = unknownTypeText;
    }
  }
  function openAddReview() {
    container.appendChild(createAddReviewForm(() => {
      router.go("/");
    }));
  }
  function openModeratorPanel() {
    if (!isUserModerator) return;
    statusBox.innerHTML = "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u043A\u0438...";
    container.appendChild(createUpdateForm());
    const btn_add = document.createElement("button");
    btn_add.classList.add("rev-button-s");
    btn_add.style.margin = "0 0 0.5rem 0";
    btn_add.innerHTML = "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043E\u0442\u0437\u044B\u0432";
    btn_add.addEventListener("click", () => {
      router.go("/moderation/suggestion");
    });
    container.appendChild(btn_add);
    const btn_parse = document.createElement("button");
    btn_parse.classList.add("rev-button-s");
    btn_parse.style.margin = "0 0 0.5rem 0";
    btn_parse.innerHTML = "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C GSParser";
    btn_parse.addEventListener("click", () => {
      fetchGSParser().then((data) => {
        const c = data["count"] ?? 0;
        alert(c === 0 ? `\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u043E\u0432\u043E\u0433\u043E` : `\u041D\u0430\u0439\u0434\u0435\u043D\u043E \u043D\u043E\u0432\u044B\u0445 \u0437\u0430\u043F\u0438\u0441\u0435\u0439: ${c}`);
      }).catch((status) => {
        statusBox.innerHTML = `\u0421\u0435\u0440\u0432\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B ${status}`;
      });
    });
    container.appendChild(btn_parse);
    fetchGetSuggestionList().then((data) => {
      statusBox.innerHTML = "";
      if (data.items.length === 0) {
        statusBox.innerHTML = "\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u043A\u0430 \u043F\u0443\u0441\u0442\u0430 =)";
      }
      container.appendChild(createListReviewsForm(
        (id) => {
          router.go("/moderation/suggestion/" + id);
        },
        data
      ));
    }).catch((status) => {
      statusBox.innerHTML = `\u0421\u0435\u0440\u0432\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B ${status}`;
    });
  }
  function openExternalReview() {
    if (!isUserModerator) return;
    container.appendChild(createUpdateForm());
    container.appendChild(createAddReviewForm(
      () => {
        router.go("/moderation");
      },
      null,
      true,
      true
    ));
  }
  function openModerationReview(params) {
    if (!isUserModerator) return;
    statusBox.innerHTML = "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0442\u0437\u044B\u0432\u0430...";
    fetchGetSuggestion(params.id).then((data) => {
      statusBox.innerHTML = "";
      container.innerHTML = "";
      container.appendChild(createUpdateForm());
      container.appendChild(createAddReviewForm(
        () => {
          router.go("/moderation");
        },
        data,
        true
      ));
    }).catch((status) => {
      router.go("/moderation");
      if (status === 404) statusBox.innerHTML = "\u041D\u0435\u0442 \u0442\u0430\u043A\u043E\u0433\u043E \u043E\u0442\u0437\u044B\u0432\u0430 \u0432 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u043A\u0435 =(";
      statusBox.innerHTML = `\u0421\u0435\u0440\u0432\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B ${status}`;
    });
  }

  // src/page.js
  var isuBoxHTML = `<a>\u0412\u0445\u043E\u0434</a>`;
  var logoutConfirm = "\u0412\u044B \u0442\u043E\u0447\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0432\u044B\u0439\u0442\u0438 \u0438\u0437 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430?";
  document.addEventListener("DOMContentLoaded", main);
  async function main() {
    createMainPage(logoutCallback2, loginCallback2);
    loadTokensPage().then((payload) => {
      resolveLogin(payload);
    }).catch(() => {
      rejectLogin(isuBoxHTML);
    });
  }
  function loginCallback2() {
    loadTokensPage().then((payload) => {
      resolveLogin(payload);
      router.go("/");
    }).catch(() => {
      rejectLogin(isuBoxHTML);
      router.notify();
    });
  }
  function logoutCallback2() {
    if (!isAuth()) return;
    const confirmation = confirm(logoutConfirm);
    if (!confirmation) return;
    resetTokensPage();
    rejectLogin(isuBoxHTML);
  }
})();
//# sourceMappingURL=page.js.map
