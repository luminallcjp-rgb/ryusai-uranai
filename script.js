/* =========================================================
   龍斎 診断ページ  script.js
   数秘計算 / 入力検証 / 保存 / 演出 / 遷移
   外部ライブラリなし・ES6
   ========================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "ryusai_diagnosis_v1";
  var MASTERS = [11, 22, 33];

  /* ----------------------------------------------------------
     数秘計算
     ---------------------------------------------------------- */

  // 1桁になるまで数字を足す。masters に含まれる値は途中・最終で保持
  function reduceNumber(n, masters) {
    masters = masters || [];
    while (n > 9) {
      if (masters.indexOf(n) !== -1) return n;
      n = String(n).split("").reduce(function (a, d) { return a + Number(d); }, 0);
    }
    return n;
  }

  // ライフパス：生年月日の全数字を合計→1桁（11/22/33保持）
  function calcLifePath(y, m, d) {
    var digits = String(y) + String(m) + String(d);
    var sum = digits.split("").reduce(function (a, c) { return a + Number(c); }, 0);
    return reduceNumber(sum, MASTERS);
  }

  // バースデー：日の数字を1桁（11/22保持）
  function calcBirthday(d) {
    return reduceNumber(d, [11, 22]);
  }

  // 月ナンバー：そのまま。10→1 / 11→11 / 12→3
  function calcMonth(m) {
    if (m === 10) return 1;
    if (m === 11) return 11;
    if (m === 12) return 3;
    return m;
  }

  // 年ナンバー：年の数字を合計→1桁（11/22/33保持）
  function calcYear(y) {
    var sum = String(y).split("").reduce(function (a, c) { return a + Number(c); }, 0);
    return reduceNumber(sum, MASTERS);
  }

  function calcAll(y, m, d) {
    return {
      life: calcLifePath(y, m, d),
      birthday: calcBirthday(d),
      month: calcMonth(m),
      year: calcYear(y)
    };
  }

  /* ----------------------------------------------------------
     保存（LocalStorage→SessionStorage→URLフォールバック）
     ---------------------------------------------------------- */
  function saveData(data) {
    var json = JSON.stringify(data);
    try {
      window.localStorage.setItem(STORAGE_KEY, json);
      return "result.html";
    } catch (e1) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, json);
        return "result.html";
      } catch (e2) {
        // ストレージ不可：URLにエンコードして渡す
        return "result.html?d=" + encodeURIComponent(json);
      }
    }
  }

  /* ----------------------------------------------------------
     入力検証
     ---------------------------------------------------------- */
  function parseDate(value) {
    // value: "YYYY-MM-DD"
    if (!value) return null;
    var parts = value.split("-");
    if (parts.length !== 3) return null;
    var y = Number(parts[0]), m = Number(parts[1]), d = Number(parts[2]);
    if (!y || !m || !d) return null;
    var dt = new Date(y, m - 1, d);
    // 妥当な日付か（例：2月30日を弾く）
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
    return { y: y, m: m, d: d, date: dt };
  }

  // フォーム要素を名前で安全に取得（form.name 等のプロパティ衝突を回避）
  function fld(form, n) { return form.elements.namedItem(n); }

  function validate(form) {
    var errors = [];
    var fields = { name: false, birth: false, gender: false };

    var name = fld(form, "name").value.trim();
    if (!name) { errors.push("お名前またはニックネームをご入力ください。"); fields.name = true; }
    else if (name.length > 30) { errors.push("お名前は30文字以内でご入力ください。"); fields.name = true; }

    if (!fld(form, "gender").value) { errors.push("性別をお選びください。"); fields.gender = true; }

    var birthValue = fld(form, "birth").value;
    var parsed = parseDate(birthValue);
    if (!birthValue) { errors.push("生年月日をご入力ください。"); fields.birth = true; }
    else if (!parsed) { errors.push("生年月日に正しい日付をご入力ください。"); fields.birth = true; }
    else {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      if (parsed.date.getTime() > today.getTime()) {
        errors.push("生年月日に未来の日付は入力できません。"); fields.birth = true;
      } else if (parsed.y < 1900) {
        errors.push("生年月日をもう一度ご確認ください。"); fields.birth = true;
      }
    }

    return { errors: errors, fields: fields, parsed: parsed, name: name };
  }

  /* ----------------------------------------------------------
     初期化
     ---------------------------------------------------------- */
  function init() {
    var form = document.getElementById("diagnose-form");
    if (!form) return;

    // 生年月日の上限を今日に
    var birthInput = fld(form, "birth");
    if (birthInput) {
      var t = new Date();
      var mm = String(t.getMonth() + 1).padStart(2, "0");
      var dd = String(t.getDate()).padStart(2, "0");
      birthInput.max = t.getFullYear() + "-" + mm + "-" + dd;
    }

    var errorBox = document.getElementById("form-errors");
    var overlay = document.getElementById("overlay");
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitting = false;

    // スムーズスクロールCTA
    document.querySelectorAll("[data-scroll]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.getElementById(el.getAttribute("data-scroll"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          var firstInput = target.querySelector("input, select");
          if (firstInput) setTimeout(function () { firstInput.focus({ preventScroll: true }); }, 500);
        }
      });
    });

    function clearErrorStyles() {
      form.querySelectorAll(".is-error").forEach(function (el) { el.classList.remove("is-error"); });
    }

    function showErrors(result) {
      errorBox.innerHTML = "";
      clearErrorStyles();
      result.errors.forEach(function (msg) {
        var li = document.createElement("li");
        li.textContent = msg;           // ユーザー由来でない固定文だが安全側でtextContent
        errorBox.appendChild(li);
      });
      if (result.fields.name) fld(form, "name").classList.add("is-error");
      if (result.fields.birth) fld(form, "birth").classList.add("is-error");
      // 最初のエラー項目へスクロール
      var firstError = form.querySelector(".is-error");
      if (!firstError && result.fields.gender) {
        firstError = document.getElementById("field-gender");
      }
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof firstError.focus === "function") firstError.focus({ preventScroll: true });
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitting) return;

      var result = validate(form);
      if (result.errors.length > 0) {
        showErrors(result);
        return;
      }

      errorBox.innerHTML = "";
      clearErrorStyles();
      submitting = true;
      if (submitBtn) { submitBtn.disabled = true; }

      var p = result.parsed;
      var data = {
        name: result.name,
        birth: { y: p.y, m: p.m, d: p.d },
        gender: (fld(form, "gender").value || ""),
        concern: (fld(form, "concern").value || ""),
        numbers: calcAll(p.y, p.m, p.d),
        ts: Date.now()
      };

      // 診断演出
      if (overlay) overlay.classList.add("show");

      window.setTimeout(function () {
        var dest = saveData(data);
        window.location.href = dest;
      }, 1500);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
