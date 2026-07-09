/* =========================
   Spark Claw — script.js
   - Bilingual (KO/EN) content dictionary
   - Language toggle with localStorage persistence
   - FAQ accordion
   - Nav scroll state + mobile menu
   - News section (Microlink-fallback or local overrides)
   - Insights section (long-form pieces by Jimmy Kim)
========================= */

(function () {
  'use strict';

  // ---- i18n dictionary ------------------------------------------------------
  const dict = {
    ko: {
      meta: {
        title: "Spark Claw — AI 네이티브 1인 창업자 프로그램",
        description: "스파크랩이 제안하는 에이전틱 AI 시대의 1인 창업자 전문 액셀러레이팅 프로그램. AI가 당신의 팀입니다."
      },
      nav: {
        apply: "지원하기", timeline: "일정",
        philosophy: "철학", benefits: "혜택", process: "프로세스", about: "스파크랩",
        news: "뉴스", insights: "인사이트", faq: "FAQ",
        program: "프로그램", updates: "소식",
        cta: "알림 신청"
      },
      hero: {
        eyebrow: "스파크랩 · 다음 배치 준비 중",
        title: { line1: "AI가", line2: "당신의 팀", line3: "입니다." },
        sub: "Spark Claw는 에이전틱 AI 시대의 1인 및 소규모 팀 창업가를 위한 스파크랩의 첫 프로그램입니다.",
        ctaPrimary: "다음 배치 알림 신청",
        ctaSecondary: "프로그램 철학 읽기 →",
        stat1: { label: "초기 투자 규모", value: "5천만 원 ~ 2억 원 <span class=\"tips-note\">(TIPS 프로그램 연계)</span>" },
        stat2: { label: "지원 대상",     value: "1인 또는 소규모 팀의 AI 창업자" },
        stat3: { label: "운영 방식",     value: "온라인/오프라인 오피스 아워 + 그룹세션 (워크샵/강의) + AI 커뮤니티 오프라인 밋업" }
      },
      philosophy: {
        label: "01 — Philosophy",
        quote: {
          part1: "뛰어난 CEO의 핵심은",
          part2: "팀원을 얼마나 잘 이끄느냐",
          part3: "에 있습니다.",
          part4: "그 팀이 AI여도 마찬가지입니다."
        },
        body: {
          p1: "기획과 개발, 마케팅, 고객 대응까지 AI 에이전트가 담당하는 시대입니다. Spark Claw는 AI를 ‘도구’가 아닌 ‘팀원’으로 활용하는 창업가를 발굴합니다.",
          p2: "Spark Claw는 AI 네이티브 창업가 한 명 한 명에 투자하는 데서 멈추지 않습니다. 이들을 한 자리에 모아 국내에서 가장 강력한 <em class=\"accent\">AI 창업자 커뮤니티</em>를 만들어갑니다. 1인 창업가에게는 동료가 곧 가장 강력한 레버리지이기 때문입니다."
        },
        quote2: {
          part1: "세상을 바꾸는 건 아이디어가 아니라 실행입니다.",
          part2: "우리는 실행으로 증명하는 빌더(Builder)를 찾고 있습니다."
        },
        body2: {
          p1: "AI는 리서치와 개발의 장벽을 빠르게 무너뜨렸습니다. 이제 누구나 아이디어를 실행으로 옮길 수 있는 시대입니다.",
          p2: "우리는 아이디어보다 실행을, 계획보다 결과를 만들어내는 빌더(Builder)에게 주목합니다."
        }
      },
      benefits: {
        label: "02 — What You Get",
        title: "SparkClaw AI-Native Builder Stack",
        tagline: "창업 초기, 가장 필요한 것부터.",
        sub: "스파크랩 포트폴리오사에게 제공되는 동일한 혜택과 더불어, AI 기업에 특화된 현금 가치 <strong class=\"accent\">5억원 상당</strong>의 혜택을 제공합니다.",
        items: [
          { title: "초기 투자",             value: "5천만 원 ~ 2억 원 <span class=\"tips-note\">(TIPS 프로그램 연계)</span>",  desc: "집중 부트캠프를 통과한 창업가 대상 초기 투자." },
          { title: "OpenAI API 크레딧",     value: "AI 인프라",     desc: "GPT 모델과 에이전트 툴 구축을 위한 크레딧." },
          { title: "Anthropic Claude 크레딧", value: "AI 인프라",   desc: "Tier 4 등급 Claude 기반 에이전틱 워크플로우 구축 지원" },
          { title: "GCP (Gemini)",          value: "AI 인프라",     desc: "Gemini API 가용 크레딧 지원" },
          { title: "Microsoft Azure",       value: "AI 인프라",     desc: "Azure 크레딧 지원, Azure 엔지니어와의 1:1 세션 지원" },
          { title: "AI 창업자 커뮤니티",     value: "네트워크",      desc: "커뮤니티형 세션 및 오프라인 밋업 개최" }
        ],
        more: {
          headline: "더 많은 글로벌 AI 파트너사가 합류 중입니다.",
          sub: "Builder Stack은 매월 확장됩니다."
        },
        partner: {
          title: "Spark Claw 파트너로 합류하고 싶으신가요?",
          sub: "AI 인프라·SaaS·서비스 분야 파트너십을 환영합니다.",
          cta: "파트너 문의하기 →"
        },
        note: "기업별 기존 사용량에 따라 팀별 제공 크레딧의 총량은 달라질 수 있습니다."
      },
      process: {
        label: "03 — How It Works",
        title: "선발은 네 단계로 진행됩니다.",
        sub: "이번 심사에서 투자로 이어지지 않아도, Spark Claw 커뮤니티와의 인연은 이어집니다.",
        steps: [
          { title: "온라인 지원",    desc: "홈페이지 상단의 지원서 양식을 작성하여 제출." },
          { title: "서류 스크리닝",  desc: "학력 및 경력 무관, AI를 ‘팀원’처럼 운용한 방식을 중심으로 평가." },
          { title: "집중 부트캠프",  desc: "Spark Claw 크레딧 제공, 스파크랩 파트너들과 함께하는 몰입형 부트캠프 진행." },
          { title: "최종 투자 심사", desc: "통과 시 초기 투자 및 스파크랩 포트폴리오사 동일 혜택 제공." }
        ],
        note: "투자로 이어지지 않은 창업가는 Stage 2 · Stage 3 풀로 분류되어 후속 배치 우선 지원 자격과 커뮤니티 멤버십이 유지됩니다."
      },
      about: {
        label: "04 — About SparkLabs",
        title: "OpenAI, Anthropic, Perplexity에 투자한 액셀러레이터.",
        body: {
          p1: "스파크랩은 OpenAI, Anthropic, Perplexity는 물론, 올해 SpaceX에 인수된 xAI와 지난해 NVIDIA에 인수된 Groq에 투자한 바 있습니다.",
          p2: "이제 스파크랩은 Spark Claw를 통해 국내 AI 분야의 우수 창업자를 선제 발굴, 육성하고자 합니다."
        },
        quote: {
          text: "“에이전틱 AI 시대에는 뛰어난 창업가 한 명이 AI 팀과 함께 시장을 바꿀 수 있습니다. Spark Claw는 그런 창업가들을 가장 먼저, 가장 깊이 이해하기 위한 프로그램입니다.”",
          cite: "김유진 · 스파크랩 대표"
        },
        facts: [
          "OpenAI · Anthropic · Perplexity · xAI · Groq 투자 이력",
          "글로벌 포트폴리오사"
        ]
      },
      news: {
        label: "05 — In the News",
        title: "언론이 주목한 Spark Claw",
        sub: "국내 주요 매체가 다룬 Spark Claw 관련 소식을 만나보세요.",
        cta: "기사 읽기 →",
        loading: "기사 불러오는 중…",
        publishers: {
          "donga.com": "동아일보",
          "mk.co.kr":  "매일경제",
          "default":   "보도"
        }
      },
      insights: {
        label: "06 — Insights",
        title: "Spark Claw Insight",
        sub: "AI 네이티브 창업자를 위한 조언.",
        stamp: "Spark Claw Insights"
      },
      faq: {
        label: "07 — FAQ",
        title: "자주 묻는 질문",
        items: [
          { q: "공동창업자 없이도 정말 지원할 수 있나요?",
            a: "네, Spark Claw는 1인 창업가 혹은 소규모 팀을 위한 프로그램입니다. 팀이 없다는 것은 결격 사유가 아니라 프로그램의 전제입니다. AI 에이전트를 팀원처럼 설계하고 운용한 기록이 가장 중요한 평가 지표입니다." },
          { q: "아이디어 단계에서도 지원이 가능한가요?",
            a: "가능합니다. 제품 완성도보다 ‘AI를 팀원처럼 활용한 맥락’을 중점적으로 평가합니다. MVP가 없다면 추후 지원서를 통해 어떤 에이전트 / 워크플로우를 구축해왔는지 구체적으로 기술해주세요." },
          { q: "이번에 투자로 이어지지 않으면 어떻게 되나요?",
            a: "Stage 2 · Stage 3 풀로 분류되어 후속 배치 프로그램 우선 지원 자격과 커뮤니티 멤버십이 유지됩니다. 한 번의 심사로 인연이 끊기지 않도록 설계되어 있습니다." },
          { q: "온라인 중심인가요, 오프라인 모임도 있나요?",
            a: "Spark Claw 프로그램은 온라인/오프라인의 다양한 워크샵과 강의 및 세션으로 이루어져 있습니다. 또한, AI 창업가 커뮤니티 형성을 위한 정기 오프라인 밋업을 진행할 예정입니다." },
          { q: "해외 창업가도 지원할 수 있나요?",
            a: "한국 시장 진출 또는 한국 기반 창업 계획이 있다면 지원 가능합니다. 세부 자격 요건은 1기 모집 공고를 통해 공개됩니다." },
          { q: "1기 모집 일정은 어떻게 되나요?",
            a: "지원서 접수는 6월 8일부터 6월 28일까지이며, 서류 심사·인터뷰를 거쳐 8월 초 부트캠프, 10월 말부터 본 프로그램이 진행됩니다.<br>상세 일정은 홈페이지 ‘일정’ 섹션에서 확인하실 수 있습니다." },
          { q: "Spark Claw의 OpenAI / Anthropic / Gemini / MS Azure 크레딧은 언제 제공되나요?",
            a: "심사 과정을 통과하여 부트캠프에 참여하는 팀들부터 제공됩니다." }
        ]
      },
      apply: {
        label: "Cohort 01 모집 마감",
        title: { line1: "다음 배치 소식을 ", line2: "가장 먼저", line3: " 받아보세요." },
        sub: "Cohort 01 모집이 마감되었습니다. 이메일을 남겨주시면 다음 배치 모집이 열릴 때 가장 먼저 알려드립니다."
      },
      timeline: {
        label: "Program Timeline",
        title: "Cohort 01 일정",
        sub: "Spark Claw 1기의 주요 일정을 안내합니다.",
        items: [
          { date: "6월 8일 (월) ~ 6월 28일 (일)", title: "지원서 접수", desc: "6월 8일 자정 오픈, 6월 28일 자정 마감" },
          { date: "6월 29일 (월) ~ 7월 10일 (금)", title: "서류 심사", desc: "제출된 지원서 기반 1차 심사 진행" },
          { date: "7월 13일 (월) ~ 7월 24일 (금)", title: "1:1 인터뷰", desc: "서류 통과자 대상, 필요 시 개별 연락 예정" },
          { date: "8월 초 ~ 10월 초", title: "부트캠프 프로그램", desc: "집중 부트캠프를 통한 검증 및 크레딧 제공" },
          { date: "10월 말 ~ 12월 중순", title: "본 프로그램", desc: "최종 선발 후 본격적인 액셀러레이팅 진행" }
        ]
      },
      footer: {
        tagline: "SparkClaw Powered by SparkLabs AI",
        links: { sparklabs: "스파크랩", apply: "알림 신청", contact: "문의하기" },
        copy: "© 2026 SparkLabs. All rights reserved."
      }
    },

    en: {
      meta: {
        title: "Spark Claw — An accelerator for AI-native solo founders",
        description: "SparkLabs' first accelerator program purpose-built for solo founders in the era of Agentic AI. AI is your team."
      },
      nav: {
        apply: "Apply", timeline: "Timeline",
        philosophy: "Philosophy", benefits: "Benefits", process: "Process", about: "About",
        news: "News", insights: "Insights", faq: "FAQ",
        program: "Program", updates: "News",
        cta: "Get notified"
      },
      hero: {
        eyebrow: "SparkLabs · Next batch in the works",
        title: { line1: "AI is", line2: " your team", line3: "." },
        sub: "Spark Claw is SparkLabs' first program built for solo founders and small teams in the age of Agentic AI.",
        ctaPrimary: "Get notified first",
        ctaSecondary: "Read our thesis →",
        stat1: { label: "Initial investment", value: "KRW 50M – 200M <span class=\"tips-note\">(via TIPS program)</span>" },
        stat2: { label: "Who we back",        value: "Solo & small-team AI founders" },
        stat3: { label: "Format",             value: "Office hours (online & offline) + group sessions (workshops & lectures) + AI community meetups" }
      },
      philosophy: {
        label: "01 — Philosophy",
        quote: {
          part1: "A great CEO is defined",
          part2: "by how well they lead their team. ",
          part3: "",
          part4: "Even when that team is AI."
        },
        body: {
          p1: "Agentic AI now ships product, writes code, runs marketing, and handles customer ops. Spark Claw backs founders who treat AI not as a tool, but as a teammate.",
          p2: "Spark Claw doesn't stop at backing AI-native founders one by one. We bring them together to build <em class=\"accent\">Korea's strongest community of AI-native founders</em> — because for a solo operator, peers are the most powerful form of leverage."
        },
        quote2: {
          part1: "Ideas don't change the world — execution does.",
          part2: "We back the builders who prove it through what they ship."
        },
        body2: {
          p1: "AI has rapidly torn down the walls around research and development. We're now in an era where anyone can turn an idea into something real.",
          p2: "We pay attention to builders — those who choose execution over ideas, and outcomes over outlines."
        }
      },
      benefits: {
        label: "02 — What you get",
        title: "SparkClaw AI-Native Builder Stack",
        tagline: "The essentials — from day one.",
        sub: "Every benefit our portfolio companies receive — plus an AI-native stack worth <strong class=\"accent\">approximately ₩500M</strong> in cash value.",
        items: [
          { title: "Seed investment",           value: "KRW 50M – 200M <span class=\"tips-note\">(via TIPS program)</span>",   desc: "Initial check for founders who complete the intensive bootcamp." },
          { title: "OpenAI API credits",        value: "AI infrastructure", desc: "Credits to build on GPT models and agent tooling." },
          { title: "Anthropic Claude credits",  value: "AI infrastructure", desc: "Tier 4 access to Claude for building agentic workflows." },
          { title: "GCP (Gemini)",              value: "AI infrastructure", desc: "Gemini API credits." },
          { title: "Microsoft Azure",           value: "AI infrastructure", desc: "Azure credits plus 1:1 sessions with Azure engineers." },
          { title: "AI founders community",     value: "Network",           desc: "Community-format sessions and offline meetups." }
        ],
        more: {
          headline: "More AI partners are joining the stack.",
          sub: "The Builder Stack keeps growing — every month."
        },
        partner: {
          title: "Want to join the Builder Stack?",
          sub: "We welcome AI infrastructure, SaaS, and service partnerships.",
          cta: "Become a partner →"
        },
        note: "Total credits provided per team may vary based on each provider's existing usage policies."
      },
      process: {
        label: "03 — How it works",
        title: "Four steps, one clear path.",
        sub: "Not funded this round? Your relationship with the Spark Claw community doesn't end there.",
        steps: [
          { title: "Online application", desc: "Fill out and submit the application form at the top of this page." },
          { title: "Screening",          desc: "Background and credentials don't matter. We focus on how you've operated AI as a teammate." },
          { title: "Intensive bootcamp", desc: "Spark Claw credits provided. A focused bootcamp alongside SparkLabs partners." },
          { title: "Investment decision", desc: "Founders who advance receive the initial check and the same benefits given to every SparkLabs portfolio company." }
        ],
        note: "Founders who aren't funded this round join SparkLabs' Stage 2 or Stage 3 pool — with priority access to future cohorts and ongoing community membership."
      },
      about: {
        label: "04 — About SparkLabs",
        title: "Investors in OpenAI, Anthropic, and Perplexity.",
        body: {
          p1: "SparkLabs has backed OpenAI, Anthropic, and Perplexity — alongside xAI (acquired by SpaceX this year) and Groq (acquired by NVIDIA last year).",
          p2: "Now, with Spark Claw, SparkLabs is going earlier — discovering and building Korea's strongest AI-native founders ahead of the rest of the market."
        },
        quote: {
          text: "“In the age of Agentic AI, a single outstanding founder can change a market alongside an AI team. Spark Claw exists to understand those founders — earlier and more deeply than anyone else.”",
          cite: "Eugene Kim · Managing Partner, SparkLabs"
        },
        facts: [
          "Investments include OpenAI, Anthropic, Perplexity, xAI & Groq",
          "Global portfolio companies"
        ]
      },
      news: {
        label: "05 — In the News",
        title: "Spark Claw in the press",
        sub: "What Korea's leading outlets are saying about Spark Claw.",
        cta: "Read article →",
        loading: "Loading article…",
        publishers: {
          "donga.com": "Donga Ilbo",
          "mk.co.kr":  "Maeil Business",
          "default":   "Press"
        }
      },
      insights: {
        label: "06 — Insights",
        title: "Spark Claw Insight",
        sub: "Advice for AI-native founders.",
        stamp: "Spark Claw Insights"
      },
      faq: {
        label: "07 — FAQ",
        title: "Frequently asked",
        items: [
          { q: "Can I really apply without a co-founder?",
            a: "Yes. Spark Claw is built for solo founders and small teams. Having no traditional team isn't a gap — it's the premise. What we evaluate most closely is how you've designed and orchestrated AI agents as teammates." },
          { q: "Can I apply at the idea stage?",
            a: "Yes. We care less about product polish and more about how you've worked with AI as a teammate. If there's no MVP yet, describe in your application the specific agents and workflows you've built." },
          { q: "What if I don't receive investment this round?",
            a: "You'll join our Stage 2 or Stage 3 pool, with priority access to future cohorts and ongoing community membership. A single decision never ends the relationship." },
          { q: "Is the program fully online?",
            a: "Spark Claw runs through a mix of online and offline workshops, lectures, and sessions. We also host regular offline meetups to build a working community of AI founders." },
          { q: "Can international founders apply?",
            a: "Yes — if your roadmap includes targeting or expanding into the Korean market." },
          { q: "What is the Cohort 01 schedule?",
            a: "Applications are open from June 8 to June 28. After screening and interviews, the bootcamp runs from early August to early October, followed by the main program from late October to mid-December.<br>See the ‘Timeline’ section on this page for full details." },
          { q: "When are Spark Claw's OpenAI / Anthropic / Gemini / MS Azure credits provided?",
            a: "Credits are provided to teams that pass the screening and join the bootcamp." }
        ]
      },
      apply: {
        label: "Cohort 01 · Applications Closed",
        title: { line1: "Be the ", line2: "first to know", line3: " about the next batch." },
        sub: "Cohort 01 applications have closed. Leave your email and we'll let you know the moment the next batch opens."
      },
      timeline: {
        label: "Program Timeline",
        title: "Cohort 01 Schedule",
        sub: "Key dates for Spark Claw's inaugural cohort.",
        items: [
          { date: "Jun 8 (Mon) – Jun 28 (Sun)", title: "Application Period", desc: "Opens midnight Jun 8, closes midnight Jun 28" },
          { date: "Jun 29 (Mon) – Jul 10 (Fri)", title: "Application Review", desc: "First-round screening based on submitted applications" },
          { date: "Jul 13 (Mon) – Jul 24 (Fri)", title: "1:1 Interviews", desc: "For shortlisted candidates; individual outreach as needed" },
          { date: "Early Aug – Early Oct", title: "Bootcamp Program", desc: "Intensive bootcamp with Spark Claw credits provided" },
          { date: "Late Oct – Mid Dec", title: "Main Program", desc: "Full accelerator program for final cohort members" }
        ]
      },
      footer: {
        tagline: "SparkClaw Powered by SparkLabs AI",
        links: { sparklabs: "SparkLabs", apply: "Get notified", contact: "Contact" },
        copy: "© 2026 SparkLabs. All rights reserved."
      }
    }
  };

  // ---- Utility: resolve dotted key path on dict --------------------------
  function resolve(obj, path) {
    return path.split('.').reduce((acc, part) => {
      if (acc == null) return undefined;
      return acc[part];
    }, obj);
  }

  // ---- Apply translations ------------------------------------------------
  function applyLang(lang) {
    const data = dict[lang] || dict.ko;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = resolve(data, key);
      if (typeof value === 'string') {
        if (/<(em|strong|br|span)[\s/>]/i.test(value)) {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = resolve(data, key);
      if (typeof value === 'string') el.setAttribute('placeholder', value);
    });

    if (data.meta) {
      if (data.meta.title) document.title = data.meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && data.meta.description) metaDesc.setAttribute('content', data.meta.description);
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    // Swap Tally form to matching language
    const tallyFrame = document.getElementById('tally-form');
    if (tallyFrame) {
      const koSrc = tallyFrame.dataset.srcKo || tallyFrame.getAttribute('data-tally-src');
      const enSrc = tallyFrame.dataset.srcEn;
      const targetSrc = lang === 'en' ? enSrc : koSrc;
      if (targetSrc) {
        if (tallyFrame.src && tallyFrame.src.indexOf('tally.so') > -1) {
          if (tallyFrame.src !== targetSrc) tallyFrame.src = targetSrc;
        } else {
          tallyFrame.setAttribute('data-tally-src', targetSrc);
        }
      }
    }

    // Re-render the news cards (publisher, date format, CTA copy all swap)
    if (typeof newsRenderData !== 'undefined' && newsRenderData) {
      renderNews(lang);
    }

    // Re-render the insights cards
    if (typeof renderInsights === 'function') {
      renderInsights(lang);
    }

    try { localStorage.setItem('sparkclaw.lang', lang); } catch (_) {}
  }

  // ---- Language toggle wiring --------------------------------------------
  function initLangToggle() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });

    let initial = 'ko';
    try {
      const saved = localStorage.getItem('sparkclaw.lang');
      if (saved && dict[saved]) initial = saved;
      else if (navigator.language && navigator.language.toLowerCase().startsWith('en')) initial = 'en';
    } catch (_) {}
    applyLang(initial);
  }

  // ---- FAQ accordion ------------------------------------------------------
  function initFaq() {
    document.querySelectorAll('.faq-item__q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item  = btn.parentElement;
        const panel = item.querySelector('.faq-item__a');
        const open  = btn.getAttribute('aria-expanded') === 'true';

        document.querySelectorAll('.faq-item__q[aria-expanded="true"]').forEach(other => {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            other.parentElement.querySelector('.faq-item__a').style.maxHeight = '0px';
          }
        });

        if (open) {
          btn.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = '0px';
        } else {
          btn.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  // ---- Nav scroll state + mobile menu ------------------------------------
  function initNav() {
    const nav = document.querySelector('.nav');
    const toTop = document.getElementById('toTop');
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
      if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const menuBtn = document.querySelector('.nav__menu');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        const open = document.body.classList.toggle('nav-open');
        menuBtn.setAttribute('aria-expanded', String(open));
      });

      document.querySelectorAll('.nav__links a').forEach(link => {
        link.addEventListener('click', () => {
          document.body.classList.remove('nav-open');
          menuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // ---- Notify form handler -----------------------------------------------
  function initNotifyForm() {
    const form = document.querySelector('.notify__form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      const action = form.getAttribute('action') || '';
      const isPlaceholder = action.includes('REPLACE_ME') || action.trim() === '';

      if (isPlaceholder) {
        e.preventDefault();
        showSuccess(form);
        return;
      }

      e.preventDefault();
      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          showSuccess(form);
        } else {
          form.submit();
        }
      } catch (_) {
        form.submit();
      }
    });
  }

  function showSuccess(form) {
    const success = form.querySelector('.notify__success');
    const input   = form.querySelector('input[type="email"]');
    const submit  = form.querySelector('button[type="submit"]');
    if (success) success.hidden = false;
    if (input) { input.value = ''; input.disabled = true; }
    if (submit) submit.disabled = true;
  }

  // ---- News section ------------------------------------------------------
  const newsItems = [
    {
      url: "https://www.donga.com/news/Economy/article/all/20260507/133881508/2",
      publisher: "donga.com",
      date: "2026-05-08",
      title: {
        ko: "“AI 팀원 이끄는 1인 창업자, 유니콘 기업 만드는 시대 왔다”",
        en: "“Solo founders leading AI teammates can now build unicorns”"
      },
      image: "assets/news/donga-133881508.jpg"
    },
    {
      url: "https://www.donga.com/news/Economy/article/all/20260507/133879312/1",
      publisher: "donga.com",
      date: "2026-05-07",
      title: {
        ko: "AI가 바꾼 창업 지형…노트북 하나로 ‘AI 팀원’ 꾸린다",
        en: "AI reshapes the startup landscape: build an ‘AI team’ with just a laptop"
      },
      image: "assets/news/donga-133879312.jpg"
    },
    {
      url: "https://www.mk.co.kr/article/12029383",
      publisher: "mk.co.kr",
      date: "2026-04-28",
      title: {
        ko: "스파크랩, 1인 AI 네이티브 창업 지원 프로그램 ‘스파크클로’ 론칭",
        en: "SparkLabs launches ‘Spark Claw,’ an accelerator for solo AI-native founders"
      },
      image: "assets/news/mk-12029383.jpg"
    }
  ];

  let newsRenderData = null;

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  function formatNewsDate(input, lang) {
    if (!input) return "";
    const d = new Date(input);
    if (isNaN(d.getTime()) || d.getFullYear() < 2000) return "";
    if (lang === "en") {
      return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
    return d.getFullYear() + "." +
           String(d.getMonth() + 1).padStart(2, "0") + "." +
           String(d.getDate()).padStart(2, "0");
  }

  function publisherLabel(slug, lang) {
    const data = dict[lang] || dict.ko;
    const map = (data.news && data.news.publishers) || {};
    return map[slug] || map["default"] || slug;
  }

  function pickNewsTitle(item, lang) {
    if (item.title) {
      if (typeof item.title === "string") return item.title;
      return item.title[lang] || item.title.ko || item.title.en || item.url;
    }
    return item.url;
  }

  function renderNews(lang) {
    const grid = document.getElementById("newsGrid");
    if (!grid || !newsRenderData) return;
    const data = dict[lang] || dict.ko;
    const ctaText = (data.news && data.news.cta) || "Read article →";

    grid.innerHTML = newsRenderData.map(entry => {
      const { item } = entry;
      const title  = pickNewsTitle(item, lang);
      const image  = item.image || "";
      const dateStr = formatNewsDate(item.date, lang);
      const publisher = publisherLabel(item.publisher, lang);
      const initial = publisher ? publisher.charAt(0) : "·";

      const mediaHTML = image
        ? `<div class="news-card__media">
             <img class="news-card__img" src="${escapeHtml(image)}" alt="" loading="lazy" />
           </div>`
        : `<div class="news-card__media news-card__media--fallback">
             <span>${escapeHtml(initial)}</span>
           </div>`;

      return `
        <li class="news-card">
          <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener"
             class="news-card__link" aria-label="${escapeHtml(title)}">
            ${mediaHTML}
            <div class="news-card__body">
              <div class="news-card__meta">
                <span class="news-card__publisher">${escapeHtml(publisher)}</span>
                ${dateStr ? `<span class="news-card__meta-sep" aria-hidden="true"></span>
                             <span class="news-card__date">${escapeHtml(dateStr)}</span>` : ""}
              </div>
              <h3 class="news-card__title">${escapeHtml(title)}</h3>
              <span class="news-card__cta">${escapeHtml(ctaText)}</span>
            </div>
          </a>
        </li>`;
    }).join("");
  }

  function initNews() {
    const grid = document.getElementById("newsGrid");
    if (!grid) return;
    newsRenderData = newsItems
      .slice()
      .sort((a, b) => {
        const ta = new Date(a.date).getTime() || 0;
        const tb = new Date(b.date).getTime() || 0;
        return tb - ta;
      })
      .map(item => ({ item }));
    renderNews(document.documentElement.lang || "ko");
  }

  // ---- Insights section --------------------------------------------------
  // Long-form pieces by Jimmy Kim. To add: append to insightsItems.
  // If `image` is omitted, falls back to a gradient cover with topic tag.
  const insightsItems = [
    {
      url: "/sparkclaw-insight-korea-builders",
      date: "2026-06-27",
      author: { ko: "김호민 (Jimmy Kim)", en: "Jimmy Kim" },
      topic: { ko: "#VerticalAI", en: "#Vertical AI" },
      title: {
        ko: "한국이 AI 시대에 늦은 게 아닙니다 — 우리는 늘 Builder였습니다",
        en: "Korea isn't late to the AI era — we've always been builders"
      },
      image: "assets/Insights/korea-builders.jpg"
    },
    {
      url: "/sparkclaw-insight-vibe-coding-security",
      date: "2026-07-07",
      author: { ko: "김호민 (Jimmy Kim)", en: "Jimmy Kim" },
      topic: { ko: "#바이브코딩", en: "#Vibe Coding" },
      title: {
        ko: "AI가 대신 코드를 짜준다. 그런데 책임까지 져줄까?",
        en: "AI writes your code. But will it take responsibility?"
      },
      image: "assets/Insights/vibe-coding-security.jpg"
    },
    {
      url: "/sparkclaw-insight-ai-agent-teammate",
      date: "2026-05-10",
      author: { ko: "김호민 (Jimmy Kim)", en: "Jimmy Kim" },
      topic: { ko: "#AI에이전트", en: "#AI Agent" },
      title: {
        ko: "AI Agent를 팀원으로 쓴다는 것의 진짜 의미",
        en: "What it really means to bring on AI agents as teammates"
      },
      image: "assets/Insights/ai-agent-teammate.jpg"
    },
    {
      url: "/sparkclaw-insight-ai-founder",
      date: "2026-04-25",
      author: { ko: "김호민 (Jimmy Kim)", en: "Jimmy Kim" },
      topic: { ko: "#창업본질", en: "#Founder WHY" },
      title: {
        ko: "AI가 팀원인 시대, 그래도 변하지 않는 것",
        en: "In the era of AI teammates, what doesn't change"
      },
      image: "assets/Insights/ai-founder.jpg"
    }
  ];

  function renderInsights(lang) {
    const grid = document.getElementById("insightsGrid");
    if (!grid) return;
    const data = dict[lang] || dict.ko;
    const stampText = (data.insights && data.insights.stamp) || "Spark Claw Insights";

    const sorted = insightsItems.slice().sort((a, b) => {
      const ta = new Date(a.date).getTime() || 0;
      const tb = new Date(b.date).getTime() || 0;
      return tb - ta;
    });

    grid.innerHTML = sorted.map(item => {
      const title  = (item.title  && (item.title[lang]  || item.title.ko))  || "";
      const topic  = (item.topic  && (item.topic[lang]  || item.topic.ko))  || "";
      const author = (item.author && (item.author[lang] || item.author.ko)) || "";
      const dateStr = formatNewsDate(item.date, lang);

      const coverHTML = item.image
        ? `<div class="insight-card__cover insight-card__cover--image">
             <img class="insight-card__img" src="${escapeHtml(item.image)}" alt="" loading="lazy" />
           </div>`
        : `<div class="insight-card__cover">
             <span class="insight-card__cover-avatar">JK</span>
             <span class="insight-card__cover-stamp">${escapeHtml(stampText)}</span>
             <span class="insight-card__cover-topic">${escapeHtml(topic)}</span>
           </div>`;

      return `
        <li class="insight-card">
          <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener"
             class="insight-card__link" aria-label="${escapeHtml(title)}">
            ${coverHTML}
            <div class="insight-card__body">
              <div class="insight-card__meta">
                <span class="insight-card__author">${escapeHtml(author)}</span>
                ${dateStr ? `<span class="insight-card__meta-sep" aria-hidden="true"></span>
                             <span class="insight-card__date">${escapeHtml(dateStr)}</span>` : ""}
              </div>
              <h3 class="insight-card__title">${escapeHtml(title)}</h3>
            </div>
          </a>
        </li>`;
    }).join("");
  }

  function initInsights() {
    renderInsights(document.documentElement.lang || "ko");
  }

  // ---- Reveal on scroll ----------------------------------------------------
  // Adds .reveal via JS (not in markup) so content stays visible without JS.
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const singles = document.querySelectorAll(
      '.section__head, .philosophy__quote, .philosophy__body, .apply__card, ' +
      '.about__grid, .faq__list, .benefits__more, .benefits__partner, .process__note'
    );
    const staggered = document.querySelectorAll(
      '.benefits__grid, .process__steps, .news__grid, .insights__grid, .timeline__steps'
    );

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.02 });

    singles.forEach(el => { el.classList.add('reveal'); io.observe(el); });
    staggered.forEach(el => { el.classList.add('reveal', 'reveal--stagger'); io.observe(el); });
  }

  // ---- Year stamp --------------------------------------------------------
  function stampYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = year; });
  }

  // ---- Boot --------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initLangToggle();
    initFaq();
    initNav();
    initNotifyForm();
    stampYear();
    initNews();
    initInsights();
    initReveal();
  });
})();
