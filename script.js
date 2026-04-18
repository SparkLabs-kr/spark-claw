/* =========================
   Spark Claw — script.js
   - Bilingual (KO/EN) content dictionary
   - Language toggle with localStorage persistence
   - FAQ accordion
   - Nav scroll state + mobile menu
   - Email form handler
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
        philosophy: "철학", benefits: "혜택", process: "프로세스", about: "스파크랩", faq: "FAQ",
        cta: "알림 받기"
      },
      hero: {
        eyebrow: "스파크랩 · Cohort 01 사전 모집",
        title: { line1: "AI가", line2: "당신의 팀", line3: "입니다." },
        sub: "Spark Claw는 에이전틱 AI 시대의 1인 창업가를 위한 스파크랩의 첫 프로그램입니다. 팀 없이도, AI와 함께라면 충분합니다.",
        ctaPrimary: "1기 모집 알림 받기",
        ctaSecondary: "프로그램 철학 읽기 →",
        stat1: { label: "초기 투자 규모", value: "₩50M – 100M" },
        stat2: { label: "지원 대상",     value: "1인 AI 창업자" },
        stat3: { label: "운영 방식",     value: "온라인 중심 + 오프라인 밋업" }
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
        }
      },
      benefits: {
        label: "02 — What You Get",
        title: "창업 초기, 가장 필요한 것부터.",
        sub: "스파크랩 포트폴리오사에 제공되는 혜택이 동일하게 적용됩니다.",
        items: [
          { title: "초기 투자",             value: "₩50M – 100M",  desc: "집중 부트캠프를 통과한 창업가 대상 초기 투자." },
          { title: "OpenAI API 크레딧",     value: "AI 인프라",     desc: "GPT 모델과 에이전트 툴 구축을 위한 크레딧." },
          { title: "Anthropic Claude 크레딧", value: "AI 인프라",   desc: "Claude 기반 에이전틱 워크플로우 구축 지원." },
          { title: "AWS 스타트업 혜택",      value: "클라우드",      desc: "AWS 스타트업 프로그램 연계 할인 혜택." },
          { title: "글로벌 SaaS 패키지",     value: "운영 도구",     desc: "AI 창업에 필수적인 툴 스택을 한 번에." },
          { title: "AI 창업자 커뮤니티",     value: "네트워크",      desc: "정기 오프라인 밋업과 온라인 세션 운영." }
        ]
      },
      process: {
        label: "03 — How It Works",
        title: "선발은 네 단계로 진행됩니다.",
        sub: "이번 심사에서 투자로 이어지지 않아도, 스파크랩과의 인연은 이어집니다.",
        steps: [
          { title: "온라인 신청",    desc: "스파크랩 공식 홈페이지를 통해 지원서를 제출합니다." },
          { title: "서류 스크리닝",  desc: "AI를 ‘팀원’처럼 운용한 방식을 중심으로 평가합니다." },
          { title: "집중 부트캠프",  desc: "스파크랩 파트너들과 함께하는 몰입형 부트캠프." },
          { title: "최종 투자 심사", desc: "통과 시 초기 투자 및 포트폴리오 혜택 제공." }
        ],
        note: "투자로 이어지지 않은 창업가는 Stage 2 · Stage 3 풀로 분류되어 후속 배치 우선 지원 자격과 커뮤니티 멤버십이 유지됩니다."
      },
      about: {
        label: "04 — About SparkLabs",
        title: "OpenAI, Anthropic, Perplexity를 초기에 알아본 액셀러레이터.",
        body: {
          p1: "스파크랩은 글로벌 AI 시장의 초기 단계부터 핵심 기업을 알아보고 투자해온 액셀러레이터입니다.",
          p2: "사우디 정부와 공동 운용 중인 5,000만 달러(약 670억원) 규모의 AIM AI 펀드를 보유하고 있으며, 국내 생태계에서도 AI 기업 투자를 대표하는 기관으로 자리매김하고 있습니다."
        },
        quote: {
          text: "“에이전틱 AI 시대에는 뛰어난 창업가 한 명이 AI 팀과 함께 시장을 바꿀 수 있습니다. Spark Claw는 그런 창업가들을 가장 먼저, 가장 깊이 이해하기 위한 프로그램입니다.”",
          cite: "김유진 · 스파크랩 대표"
        },
        facts: [
          "OpenAI · Anthropic · Perplexity 초기 투자 이력",
          "사우디 정부와 공동 운용 AIM AI Fund",
          "글로벌 포트폴리오사"
        ]
      },
      faq: {
        label: "05 — FAQ",
        title: "자주 묻는 질문",
        items: [
          { q: "공동창업자 없이도 정말 지원할 수 있나요?",
            a: "네. Spark Claw는 1인 창업자를 위한 프로그램입니다. 팀이 없다는 것은 결격 사유가 아니라 프로그램의 전제입니다. AI 에이전트를 팀원처럼 설계하고 운용한 기록이 가장 중요한 평가 지표입니다." },
          { q: "아이디어 단계에서도 지원이 가능한가요?",
            a: "가능합니다. 제품 완성도보다 ‘AI를 팀원처럼 활용한 맥락’을 중점적으로 평가합니다. MVP가 없다면, 어떤 에이전트 / 워크플로우를 구축해왔는지 구체적으로 기술해주세요." },
          { q: "이번에 투자로 이어지지 않으면 어떻게 되나요?",
            a: "Stage 2 · Stage 3 풀로 분류되어 후속 배치 프로그램 우선 지원 자격과 커뮤니티 멤버십이 유지됩니다. 한 번의 심사로 인연이 끊기지 않도록 설계되어 있습니다." },
          { q: "온라인 중심인가요, 오프라인 모임도 있나요?",
            a: "온라인 세션을 중심으로 운영하되, AI 창업가 커뮤니티 형성을 위한 정기 오프라인 밋업을 병행합니다." },
          { q: "해외 창업가도 지원할 수 있나요?",
            a: "한국 시장 진출 또는 한국 기반 창업 계획이 있다면 지원 가능합니다. 세부 자격 요건은 1기 모집 공고를 통해 공개됩니다." },
          { q: "1기 모집 일정은 언제 공개되나요?",
            a: "세부 일정과 지원 자격은 순차적으로 공개됩니다. 이메일 알림을 등록해두시면 가장 먼저 안내드립니다." }
        ]
      },
      notify: {
        label: "Cohort 01 · Coming Soon",
        title: { line1: "가장 먼저", line2: " 당신에게 ", line3: "알리겠습니다." },
        sub: "모집 오픈, 부트캠프 일정, 자격 요건이 공개되는 즉시 이메일로 안내드립니다.",
        form: {
          emailLabel: "이메일",
          emailPlaceholder: "name@company.com",
          submit: "알림 받기",
          privacy: "이메일 주소는 Spark Claw 관련 안내에만 사용됩니다.",
          success: "등록되었습니다. Cohort 01 소식을 가장 먼저 받아보실 수 있습니다."
        }
      },
      footer: {
        tagline: "스파크랩의 1인 창업자 전문 프로그램.",
        links: { sparklabs: "스파크랩", apply: "알림 받기", contact: "문의하기" },
        copy: "© 2026 SparkLabs. All rights reserved."
      }
    },

    en: {
      meta: {
        title: "Spark Claw — An accelerator for AI-native solo founders",
        description: "SparkLabs' first accelerator program purpose-built for solo founders in the era of Agentic AI. AI is your team."
      },
      nav: {
        philosophy: "Philosophy", benefits: "Benefits", process: "Process", about: "About", faq: "FAQ",
        cta: "Notify me"
      },
      hero: {
        eyebrow: "SparkLabs · Cohort 01 · Pre-launch",
        title: { line1: "AI is", line2: " your team", line3: "." },
        sub: "Spark Claw is SparkLabs' first program built for solo founders in the age of Agentic AI. With AI as your co-builder, you're never alone.",
        ctaPrimary: "Get notified for Cohort 01",
        ctaSecondary: "Read our thesis →",
        stat1: { label: "Initial investment", value: "KRW 50M – 100M" },
        stat2: { label: "Who we back",        value: "Solo AI founders" },
        stat3: { label: "Format",             value: "Online-first, offline meetups" }
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
        }
      },
      benefits: {
        label: "02 — What you get",
        title: "The essentials — from day one.",
        sub: "The same support every SparkLabs portfolio company receives.",
        items: [
          { title: "Seed investment",           value: "KRW 50M – 100M", desc: "Initial check for founders who complete the intensive bootcamp." },
          { title: "OpenAI API credits",        value: "AI infrastructure", desc: "Credits to build on GPT models and agent tooling." },
          { title: "Anthropic Claude credits",  value: "AI infrastructure", desc: "Support for building Claude-powered agentic workflows." },
          { title: "AWS startup perks",         value: "Cloud",           desc: "Discounts through the AWS startup program." },
          { title: "Global SaaS stack",         value: "Operations",      desc: "The essential tooling for an AI-native company — bundled." },
          { title: "AI founders community",     value: "Network",         desc: "Regular offline meetups and a working online cohort." }
        ]
      },
      process: {
        label: "03 — How it works",
        title: "Four steps, one clear path.",
        sub: "Not funded this round? Your relationship with SparkLabs doesn't end there.",
        steps: [
          { title: "Online application", desc: "Submit your application through the SparkLabs site." },
          { title: "Screening",          desc: "We review how you've built with AI as a teammate — not just a tool." },
          { title: "Intensive bootcamp", desc: "A focused sprint alongside SparkLabs partners." },
          { title: "Investment decision", desc: "Founders who advance receive the initial check and full portfolio benefits." }
        ],
        note: "Founders who aren't funded this round join SparkLabs' Stage 2 or Stage 3 pool — with priority access to future cohorts and ongoing community membership."
      },
      about: {
        label: "04 — About SparkLabs",
        title: "Early backers of OpenAI, Anthropic, and Perplexity.",
        body: {
          p1: "SparkLabs is a global accelerator that has identified and backed the defining AI companies at their earliest stages.",
          p2: "We co-manage the USD 50M AIM AI Fund with the Government of Saudi Arabia, and are among the most active institutional AI investors in Korea."
        },
        quote: {
          text: "\u201CIn the age of Agentic AI, a single outstanding founder can change a market alongside an AI team. Spark Claw exists to understand those founders — earlier and more deeply than anyone else.\u201D",
          cite: "Eugene Kim · Managing Partner, SparkLabs"
        },
        facts: [
          "Early-stage backer of OpenAI, Anthropic & Perplexity",
          "AIM AI Fund — co-managed with the Saudi government",
          "Global portfolio companies"
        ]
      },
      faq: {
        label: "05 — FAQ",
        title: "Frequently asked",
        items: [
          { q: "Can I really apply without a co-founder?",
            a: "Yes. Spark Claw is built specifically for solo founders. No traditional team isn't a gap — it's the premise. What we evaluate most closely is how you've designed and orchestrated AI agents as teammates." },
          { q: "Can I apply at the idea stage?",
            a: "Yes. We care less about product polish and more about how you've worked with AI as a teammate. If there's no MVP yet, show us the agents and workflows you've built along the way." },
          { q: "What if I don't receive investment this round?",
            a: "You'll join our Stage 2 or Stage 3 pool, with priority access to future cohorts and ongoing community membership. A single decision never ends the relationship." },
          { q: "Is the program fully online?",
            a: "Online-first, with regular offline meetups to build a working community of AI-native founders in Korea." },
          { q: "Can international founders apply?",
            a: "Yes — if you plan to build in or for the Korean market. Full eligibility will be published with the Cohort 01 announcement." },
          { q: "When will Cohort 01 timing be announced?",
            a: "We'll share timing, eligibility, and application details in phases. Subscribe below and you'll hear first." }
        ]
      },
      notify: {
        label: "Cohort 01 · Coming soon",
        title: { line1: "Hear about it", line2: " first.", line3: "" },
        sub: "We'll email you the moment applications open — along with the bootcamp schedule and eligibility details.",
        form: {
          emailLabel: "Email",
          emailPlaceholder: "name@company.com",
          submit: "Notify me",
          privacy: "We'll only use your email for Spark Claw updates.",
          success: "You're on the list. You'll hear about Cohort 01 first."
        }
      },
      footer: {
        tagline: "A SparkLabs program for solo founders.",
        links: { sparklabs: "SparkLabs", apply: "Notify me", contact: "Contact" },
        copy: "© 2026 SparkLabs. All rights reserved."
      }
    }
  };

  // ---- Utility: resolve dotted key path on dict --------------------------
  function resolve(obj, path) {
    return path.split('.').reduce((acc, part) => {
      if (acc == null) return undefined;
      // Support array index like "items.0.q"
      return acc[part];
    }, obj);
  }

  // ---- Apply translations ------------------------------------------------
  function applyLang(lang) {
    const data = dict[lang] || dict.ko;
    document.documentElement.lang = lang;

    // text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = resolve(data, key);
      if (typeof value === 'string') {
        // Allow limited HTML (<em>, <br>, <strong>) in translation strings
        if (/<(em|strong|br|span)[\s/>]/i.test(value)) {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      }
    });

    // placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = resolve(data, key);
      if (typeof value === 'string') el.setAttribute('placeholder', value);
    });

    // meta
    if (data.meta) {
      if (data.meta.title) document.title = data.meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && data.meta.description) metaDesc.setAttribute('content', data.meta.description);
    }

    // toggle button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    // persist
    try { localStorage.setItem('sparkclaw.lang', lang); } catch (_) {}
  }

  // ---- Language toggle wiring --------------------------------------------
  function initLangToggle() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });

    // initial: saved > browser > default ko
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

        // close siblings (optional accordion behavior)
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
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

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
      // If the action still contains the placeholder, handle locally (success UX only).
      const action = form.getAttribute('action') || '';
      const isPlaceholder = action.includes('REPLACE_ME') || action.trim() === '';

      if (isPlaceholder) {
        e.preventDefault();
        showSuccess(form);
        return;
      }

      // Otherwise: submit via fetch (Formspree-compatible) for inline success.
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
          form.submit(); // fallback: full-page submit
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
  });
})();
