/* =========================================================
   龍斎 結果ページ  result.js
   診断データ + 補助数値アクセント + 描画ロジック

   ▼拡張方法
   diagnosisData に「ライフパス番号: { ... }」を追記するだけで
   タイプが増えます（現在は 1 のみ。2,3,4,5,6,7,8,9,11,22,33 を後追加）。
   1タイプぶんのキー構成は下記 type 1 をテンプレートにしてください。
   ========================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "ryusai_diagnosis_v1";

  /* CTA・共有設定（リンク先はここで一括管理） */
  var RYUSAI = {
    ctaUrl: "https://psyacademy.base.shop/items/143775193",
    shareUrl: (function () {
      var u = window.location.href.split("?")[0].split("#")[0];
      return u.replace(/result\.html$/, "index.html");
    })()
  };

  /* ----------------------------------------------------------
     診断データ（※段落は \n\n 区切り。textContent で安全に描画）
     キー = ライフパスナンバー
     ---------------------------------------------------------- */
  var diagnosisData = {

  1: {
    auraName: "深紅",
    auraClass: "aura-red",
    auraText: "深紅は、燃えるような生命力と、前へ進もうとする意志の色です。あなたの周りには、どこか凛とした熱が漂っていて、初めて会う人にも「この人は芯がある」という印象を与えます。\n\n今のあなたは、何かを始めたい、自分の力で道を切り拓きたいという気持ちが内側で高まっている時期にあります。受け身でいると物足りなさを感じやすく、自分が主導権を握れる場面でこそ、本来の輝きが出ます。\n\n心の奥には『自分らしく在りたい』『誰かの後ろをついていくだけでは終わりたくない』という強い欲求があります。その熱はときに周囲を圧倒しますが、向かう先が定まったときのあなたの推進力は、誰にも真似できないものになります。運気としては、迷うより動いたほうが流れをつかみやすい時期です。",
    essenceText: "あなたの本質は、自分の人生を自分の手で動かしていく『開拓者』です。誰かに決めてもらうより、たとえ遠回りでも自分で選んだ道を歩きたい。その姿勢が、あなたの存在感を作っています。\n\n一方で、強さの裏側には、とても素直で熱い感情があります。本当は人一倍、認められたい気持ちや、誰かの役に立ちたい気持ちを持っていて、それを表に出すのが少し照れくさいだけなのです。\n\nまた、あなたは場の空気の変化にとても敏感です。会話が弾んでいるか、相手が無理をしていないか、その場の温度のようなものを、言葉にされる前から感じ取っています。理由ははっきり説明できなくても『この人とは合いそう』『この話はうまくいきそう』という予感が浮かび、それが後で当たっていることも少なくないはずです。\n\nこうした感覚を、あなたは『勘がいいだけ』と片づけてきたかもしれません。けれど、決断の速さの裏には、論理だけでは説明できない受け取り方が確かに働いています。前に進む力と、空気を読む繊細さ。この二つを併せ持っているのが、あなたという人の面白さです。",
    impressionText: "初対面では、はっきりした物言いと堂々とした雰囲気から『頼れそう』『リーダータイプ』と見られることが多いでしょう。実際、人はあなたの前だと自然と背筋が伸びるところがあります。\n\n親しくなると、その印象は少し変わります。意外と面倒見がよく、仲間のためなら自分のことを後回しにする情の厚さが見えてきて、『見た目より優しい人』と言われることが増えます。\n\n周囲からは、引っ張る役割やまとめ役を期待されがちです。ただ本人としては、強がっているだけで内心は不安なときも多く、その『弱さを見せにくい』ギャップが、あなたらしさでもあります。",
    weaknessText: "あなたの隠れた弱さは、人に頼るのが苦手なことです。これは『自分でやり切りたい』という長所の裏返しでもあります。\n\n自分で道を切り拓ける力がある分、つい何でも一人で背負い込み、気づけば限界まで頑張っていることがあります。特に、責任を任された場面や、誰かに弱みを見せられない相手の前では、それが強く出ます。\n\nまた、思い通りに進まないとき、自分にも他人にも厳しくなりやすい一面があります。本当は疲れているのに『まだやれる』と自分を奮い立たせ、後でどっと反動が来ることも。\n\n楽になるコツは、全部を勝ち負けで考えないことです。頼ることは負けではなく、信頼の表現だと捉え直すと、肩の力が抜けます。一人で百点を目指すより、誰かと七十点ずつ出し合うほうが、結果的に遠くまで行けます。",
    talents: [
      { title: "場を動かすリーダーシップ", text: "あなたには、迷っている人たちの背中を押し、最初の一歩を踏み出させる力があります。誰かが『どうしよう』と立ち止まっているとき、あなたの一言で空気が前向きに変わることがよくあるはずです。\n\n日常では、グループで予定が決まらないときに『じゃあこうしよう』とまとめたり、新しいことに真っ先に手を挙げたりする場面に表れます。人を率いる役割や、ゼロから何かを立ち上げる場面で、この力は特に活きます。" },
      { title: "迷いを断ち切る決断力", text: "情報がそろい切らない状況でも、あなたは『今はこれ』と決めて前に進むことができます。多くの人が選択を先延ばしにする場面で、あなたの一歩が物事を動かします。\n\nおもしろいのは、理屈で全部を詰める前に、答えのほうが先に浮かぶことがある点です。後から考えると筋が通っていた、ということが多く、あなたの中には経験を超えた判断のセンサーが働いています。日々の小さな選択から大事な決断まで、スピードが武器になります。" },
      { title: "周囲を巻き込む推進力", text: "一度やると決めたら最後までやり抜く熱量が、あなたの大きな魅力です。その本気は周りに伝わり、気づけば人が集まり、協力者が増えていきます。\n\nまた、その場の温度をすばやく察して、誰が乗り気で誰が引いているのかを感じ取りながら進められるのも強みです。仕事の立ち上げ、イベントの企画、停滞したチームの立て直しなど、『動かす』ことが求められる場面で頼りにされます。" }
    ],
    workText: "仕事では、自分の裁量で動ける環境でこそ力を発揮します。手順がきっちり決められた作業より、自分で判断し、工夫しながら進める仕事のほうが向いています。\n\n力を発揮しやすいのは、責任の所在がはっきりしていて、結果が自分の頑張りに返ってくる場です。逆に、決定権がなく、ただ指示を待つだけの環境や、誰の成果か分からない曖昧な状況では、やる気を失いやすい傾向があります。\n\n向いている役割としては、新規事業の立ち上げ、企画、営業、マネジメント、店舗運営など、自分が前に立って動かすものが挙げられます。結果がはっきり出る分野とも相性が良いでしょう。\n\n評価されやすいのは、決断の速さと責任感の強さです。『この人に任せれば動く』という信頼が、あなたの最大の武器になります。",
    loveText: "恋愛では、好きになると気持ちがまっすぐ相手に向かいます。駆け引きは苦手で、好意は態度にも表れやすいタイプです。\n\n好きになるまでは意外と慎重で、相手の本気度を見ています。けれど一度心を決めると、相手を全力で大切にし、頼られると俄然張り切ります。リードしたい気持ちが強く、それが頼もしさという魅力になります。\n\n傷つきやすいのは、自分の頑張りが当たり前のように扱われたときです。尽くしているのに感謝が返ってこないと、急に冷めてしまうことがあります。\n\n相性が良いのは、あなたの強さを受け止めつつ、ときどき素直に甘えさせてくれる相手です。あなたの『本当は寂しがり』な部分を分かってくれる人だと、長く穏やかな関係を築けます。恋を良くするコツは、強がらずに『助けてほしい』と言ってみることです。",
    awakeningText: "あなたが無意識に使っているのは、決断の瞬間に働く直感と、その場の空気を読む感覚です。『なんとなくこっちだと思った』『理由はないけど、そう感じた』——あなたにとっては当たり前すぎて、わざわざ意識したことすらないかもしれません。\n\nだからこそ、その感覚を『たまたま』や『勘がいいだけ』として片づけてしまいがちです。けれど、繰り返し当たっているなら、それはもう偶然ではなく、あなたが持っている受け取り方のクセであり、ひとつの才能です。\n\n魂の覚醒とは、突然特別な存在になることではありません。これまで無意識に使ってきた感覚や才能に気づき、自分の力として扱えるようになることです。\n\n自分の感覚を信じられるようになると、決断に迷いが減り、人の言葉に振り回されにくくなります。『自分はこれでいい』という軸が定まり、仕事でも人間関係でも、自分に合う選択が見えやすくなります。誰かと比べて焦るより、自分の道を選べるようになる——それが、あなたにとっての本当の強さの完成形です。"
  }

  };

  /* ----------------------------------------------------------
     補助数値アクセント（細かな文章変化・タイプ非依存）
     ---------------------------------------------------------- */

  // バースデーナンバー → 才能の補足（1文）
  var birthdayAccents = {
    1: "誕生日が示すのは、自分で道を選び取る『自立心』。最終的に頼れるのは自分だと知っている強さがあります。",
    2: "誕生日が示すのは、相手の気持ちにそっと寄り添う『受け止める力』。言葉にされない感情の機微にも気づけます。",
    3: "誕生日が示すのは、その場を明るくする『場づくりの才能』。あなたがいるだけで空気がやわらぐ瞬間があります。",
    4: "誕生日が示すのは、コツコツ積み上げる『継続の力』。地味でも続けられることが、大きな信頼につながります。",
    5: "誕生日が示すのは、状況に合わせて動ける『臨機応変さ』。変化を恐れず楽しめるしなやかさがあります。",
    6: "誕生日が示すのは、周りを和ませる『包容力』。困っている人をほうっておけない優しさが備わっています。",
    7: "誕生日が示すのは、物事の奥を見ようとする『探究心』。表面的な答えで満足しない深さがあります。",
    8: "誕生日が示すのは、現実を動かす『実行力』。やると決めたことを形にしていく地力があります。",
    9: "誕生日が示すのは、全体を見渡す『俯瞰力』。一歩引いて状況をとらえる落ち着きがあります。",
    11: "誕生日が示すのは、人より一段細やかな『感受性』。空気や気配の微妙な変化を敏感に受け取ります。",
    22: "誕生日が示すのは、大きな構想を地に足つけて進める『現実化の力』。夢を計画に落とし込めます。"
  };

  // 月ナンバー → 恋愛の補足（1文）
  var monthLoveAccents = {
    1: "恋愛では、自分から動くほうが流れをつかみやすいタイプです。気持ちは早めに伝えたほうが、すれ違いを防げます。",
    2: "相手のペースを大切にできるあなたは、安心感を与える存在。ただ我慢しすぎないことが、長続きの鍵です。",
    3: "明るさと素直さが恋の魅力。気持ちを言葉や態度で表すと、関係がぐっと温かくなります。",
    4: "じっくり信頼を育てる恋が向いています。焦らず時間をかけることが、結果的に深い絆になります。",
    5: "新鮮さや刺激が恋を彩ります。お互いの自由を尊重し合える相手と、心地よい関係を築けます。",
    6: "尽くす愛情の深さが魅力。与えるだけでなく受け取ることも、関係を健やかに保ちます。",
    7: "心を開くまでに時間がかかるぶん、信頼した相手はとても大切にします。一人の時間を理解してくれる人と相性が良いでしょう。",
    8: "頼りがいと情熱が恋の魅力。素直に甘える瞬間を見せると、相手との距離が一気に縮まります。",
    9: "相手を丸ごと受け止める優しさがあります。自分の気持ちも後回しにしすぎないことを意識すると、関係が安定します。",
    11: "相手の感情を敏感に感じ取れるぶん、影響も受けやすいタイプ。自分の気持ちと相手の気持ちを、そっと分けて見ると楽になります。"
  };

  // 年ナンバー → 仕事の補足（1文）
  var yearWorkAccents = {
    1: "仕事では、自分が先頭に立てる場面でこそ評価が高まります。新しい取り組みを任されると力を発揮します。",
    2: "仕事では、人と人をつなぐ調整役として重宝されます。チームの潤滑油になれる人です。",
    3: "仕事では、伝える・表現する場面であなたらしさが光ります。発信やアイデア出しが強みになります。",
    4: "仕事では、正確さと粘り強さが信頼を生みます。任された仕事を着実に仕上げる姿勢が評価されます。",
    5: "仕事では、変化の多い環境ほど力を発揮します。柔軟な対応力が、あなたの価値になります。",
    6: "仕事では、人を支え育てる役割が向いています。誰かの成長に関わる場面でやりがいを感じます。",
    7: "仕事では、深く考え、質を追う場面で本領を発揮します。専門性を磨くほど評価が高まります。",
    8: "仕事では、成果と責任を引き受ける立場で輝きます。大きな目標ほど燃えるタイプです。",
    9: "仕事では、全体を見て価値を生み出す視点が強みです。理念や意味のある仕事に力が湧きます。",
    11: "仕事では、人の気持ちや場の空気を読む感覚が活きます。直感を信頼できる環境だと伸びやすいでしょう。",
    22: "仕事では、大きな構想を現実の形にしていく力が際立ちます。スケールの大きな仕事ほど向いています。",
    33: "仕事では、人を癒し支えることそのものが価値になります。あなたの存在に救われる人がいます。"
  };

  // 任意質問（悩み）→ 冒頭の一文
  var concernNotes = {
    "自分の性格": "今のあなたは、自分が本当はどんな人間なのかを、あらためて見つめ直したい時期に入っているようです。",
    "仕事・才能": "今のあなたは、自分の能力をどこで活かせるのかを知りたい時期に入っています。",
    "恋愛": "今のあなたは、誰かとの関係を通して、自分の本当の気持ちを確かめようとしています。",
    "人間関係": "周囲へ気を配る時間が増え、自分の気持ちを後回しにしている可能性があります。",
    "将来": "これからの生き方について、今まで以上に真剣に考え始めているようです。",
    "霊的な感覚": "最近、直感や夢、場所の空気など、説明しにくい感覚が気になっているかもしれません。"
  };

  // 「恋愛」を選んだ場合、恋愛欄に追加する一文
  var loveConcernExtra = "今のあなたは恋愛に意識が向いているぶん、相手の小さな言動にも気持ちが揺れやすいかもしれません。けれど、その感じやすさは、相手を深く思える優しさの裏返しです。無理に平気なふりをせず、自分の心の動きをていねいに見てあげることが、良い関係への近道になります。";

  /* ----------------------------------------------------------
     データ取得（LocalStorage→SessionStorage→URL）
     ---------------------------------------------------------- */
  function loadData() {
    var json = null;
    try { json = window.localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (!json) { try { json = window.sessionStorage.getItem(STORAGE_KEY); } catch (e) {} }
    if (!json) {
      var m = window.location.search.match(/[?&]d=([^&]+)/);
      if (m) { try { json = decodeURIComponent(m[1]); } catch (e) {} }
    }
    if (!json) return null;
    try {
      var data = JSON.parse(json);
      if (data && data.numbers && typeof data.numbers.life !== "undefined") return data;
    } catch (e) {}
    return null;
  }

  function clearData() {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    try { window.sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  // 該当タイプを取得。未追加のタイプなら、暫定的に存在する最初のタイプで描画
  function pickType(life) {
    if (diagnosisData[life]) return diagnosisData[life];
    var keys = Object.keys(diagnosisData);
    return diagnosisData[keys[0]];
  }

  /* ----------------------------------------------------------
     描画ヘルパー（textContent で安全に）
     ---------------------------------------------------------- */
  function setParagraphs(el, text, extra) {
    if (!el) return;
    el.textContent = "";
    String(text).split("\n\n").forEach(function (t) {
      var p = document.createElement("p");
      p.textContent = t.trim();
      el.appendChild(p);
    });
    if (extra) {
      var pe = document.createElement("p");
      pe.textContent = extra;
      el.appendChild(pe);
    }
  }

  function renderTalents(container, talents, birthdayAccent) {
    if (!container) return;
    container.textContent = "";
    talents.forEach(function (t, i) {
      var card = document.createElement("div");
      card.className = "talent";
      var h = document.createElement("h3");
      var num = document.createElement("span");
      num.className = "num";
      num.textContent = String(i + 1);
      h.appendChild(num);
      h.appendChild(document.createTextNode(t.title));
      card.appendChild(h);
      String(t.text).split("\n\n").forEach(function (para) {
        var p = document.createElement("p");
        p.textContent = para.trim();
        card.appendChild(p);
      });
      container.appendChild(card);
    });
    if (birthdayAccent) {
      var note = document.createElement("div");
      note.className = "talent";
      var p2 = document.createElement("p");
      p2.textContent = birthdayAccent;
      note.appendChild(p2);
      container.appendChild(note);
    }
  }

  /* ----------------------------------------------------------
     リビール演出 / 共有 / 戻る / 追従
     ---------------------------------------------------------- */
  function setupReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  function setupShare(auraName) {
    var btn = document.getElementById("share-btn");
    if (!btn) return;
    var text = "龍斎の無料オーラ・才能診断を受けました。\n私のオーラカラーは「" + auraName + "」でした。";
    btn.addEventListener("click", function () {
      if (navigator.share) {
        navigator.share({ title: "龍斎 オーラ・才能診断", text: text, url: RYUSAI.shareUrl }).catch(function () {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text + "\n" + RYUSAI.shareUrl).then(
          function () { flash(btn, "リンクをコピーしました"); },
          function () { fallbackCopy(btn, text); }
        );
      } else {
        fallbackCopy(btn, text);
      }
    });
  }

  function fallbackCopy(btn, text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text + "\n" + RYUSAI.shareUrl;
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      flash(btn, "リンクをコピーしました");
    } catch (e) {
      flash(btn, "コピーできませんでした");
    }
  }

  function flash(btn, msg) {
    var original = btn.textContent;
    btn.textContent = msg;
    setTimeout(function () { btn.textContent = original; }, 1800);
  }

  function setupReDiagnose() {
    var btn = document.getElementById("redo-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      clearData();
      window.location.href = "index.html";
    });
  }

  function setupScrollUI() {
    var toTop = document.getElementById("to-top");
    var sticky = document.getElementById("sticky-cta");
    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (toTop) toTop.classList.toggle("show", y > 600);
      if (sticky) sticky.classList.toggle("show", y > 800);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function setCtaLinks() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-cta]"), function (a) {
      a.setAttribute("href", RYUSAI.ctaUrl);
    });
  }

  /* ----------------------------------------------------------
     メイン描画
     ---------------------------------------------------------- */
  function render() {
    var data = loadData();
    var content = document.getElementById("result-content");
    var noData = document.getElementById("no-data");

    if (!data) {
      if (content) content.style.display = "none";
      if (noData) noData.style.display = "block";
      return;
    }
    if (noData) noData.style.display = "none";
    if (content) content.style.display = "";

    var d = pickType(data.numbers.life);

    var nameEl = document.getElementById("user-name");
    if (nameEl) nameEl.textContent = data.name; // ユーザー入力 → textContent

    var concernEl = document.getElementById("concern-note");
    if (concernEl) {
      var note = concernNotes[data.concern];
      concernEl.textContent = note ? note : "";
    }

    // 1. オーラ
    var orb = document.getElementById("aura-orb");
    if (orb) orb.className = "aura-orb " + d.auraClass;
    var auraNameEl = document.getElementById("aura-name");
    if (auraNameEl) {
      auraNameEl.textContent = "";
      var small = document.createElement("small");
      small.textContent = "あなたのオーラカラー";
      auraNameEl.appendChild(small);
      auraNameEl.appendChild(document.createTextNode(d.auraName));
    }
    setParagraphs(document.getElementById("aura-text"), d.auraText);

    // 2〜4
    setParagraphs(document.getElementById("essence-text"), d.essenceText);
    setParagraphs(document.getElementById("impression-text"), d.impressionText);
    setParagraphs(document.getElementById("weakness-text"), d.weaknessText);

    // 5. 才能（バースデーナンバーで1文追加）
    renderTalents(document.getElementById("talents"), d.talents, birthdayAccents[data.numbers.birthday]);

    // 6. 仕事（年ナンバーで1文追加）
    setParagraphs(document.getElementById("work-text"), d.workText, yearWorkAccents[data.numbers.year]);

    // 7. 恋愛（月ナンバー + 悩みが恋愛なら更に追加）
    var loveExtra = monthLoveAccents[data.numbers.month] || "";
    if (data.concern === "恋愛") {
      loveExtra = (loveExtra ? loveExtra + " " : "") + loveConcernExtra;
    }
    setParagraphs(document.getElementById("love-text"), d.loveText, loveExtra);

    // 8. 覚醒
    setParagraphs(document.getElementById("awakening-text"), d.awakeningText);

    setCtaLinks();
    setupShare(d.auraName);
    setupReDiagnose();
    setupScrollUI();
    setupReveal();

    document.title = data.name + "さんのオーラ・才能診断結果｜龍斎";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
