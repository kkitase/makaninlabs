# Makanin Labs トレーニング送客サイト改修 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Makanin Labs サイトを「AI × Marketing 講演・カスタムワークショップの送客サイト」に転換する。日本語のみ化、トップページのリブランド、Workshop セクション新設を行う。

**Architecture:** 既存の単一ページ React + TypeScript + Vite 構成を維持。バイリンガル機構を全削除し、各コンポーネントを日本語リテラル直接記述に簡素化。新規セクション `Workshop` を追加し、既存 `Services` を `Topics` にリネーム + 内容刷新。

**Tech Stack:** React 19 / TypeScript / Vite 6 / Tailwind CSS（CDN）/ Firebase Hosting。新規 npm パッケージ追加なし。

**設計ドキュメント:** `docs/superpowers/specs/2026-05-02-training-pivot-design.md`

---

## 進め方の前提

- このリポジトリには **テストフレームワークが存在しない**（Vitest / Jest 等の設定なし）。検証は **`npm run build` による TypeScript 型チェック + バンドル成功** を主軸にする
- 各タスクは「子コンポーネントの更新」と「`App.tsx` 側の prop 受け渡し更新」を 1 つにまとめ、**各タスク完了時点で常にビルドが通る** 状態を維持する
- 開発サーバ起動コマンドは `npm run dev`（Vite は HTTPS で `https://localhost:5173/` を使用）。視覚確認は最後にまとめて実施
- すべてのコミットは `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>` を含める

---

## ファイル構成（最終形）

```
makaninlabs/
├── App.tsx                  # Language 型と lang state を削除、Workshop import 追加
├── components/
│   ├── Header.tsx           # JP/EN トグル削除、props から lang 削除
│   ├── Hero.tsx             # 新コピー（案 B）、CTA "講演・ワークショップを依頼する"
│   ├── Topics.tsx           # 旧 Services.tsx をリネーム + 内容刷新（3 領域）
│   ├── Workshop.tsx         # 新規（講演・登壇 / カスタムワークショップの 2 カラム）
│   ├── ContactSection.tsx   # placeholder 更新、英語版コンテンツ削除
│   └── Footer.tsx           # 英語版削除、年号 2026 に更新
└── index.html               # title / description 更新（lang は既に "ja"）
```

`components/Services.tsx` は削除（リネームのため）。

---

## タスク一覧

### Task 1: Footer を日本語化し年号を 2026 に更新

**Files:**
- Modify: `components/Footer.tsx`
- Modify: `App.tsx`

- [ ] **Step 1: `Footer.tsx` を日本語のみに書き換える**

`components/Footer.tsx` 全体を以下の内容で置き換える：

```tsx

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#333333] py-32 border-t border-[#E5E5E5]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 border-b border-[#F9F9F9] pb-24 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-10 h-10 bg-[#333333] flex items-center justify-center">
                <span className="text-white font-serif text-xl">M</span>
              </div>
              <span className="text-3xl font-serif tracking-widest uppercase">Makanin Labs</span>
            </div>
            <p className="text-[#666666] leading-[2.0] text-lg font-light italic">
              AI とデータの力で、日本のマーケティングに新しいスタンダードを。
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-px bg-[#FFE600] mb-4"></div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#CCCCCC]">Towards Sincerity</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] text-[#BBBBBB] uppercase">
          <p>© 2026 Makanin Labs All Rights Reserved.</p>
          <p className="mt-4 md:mt-0 font-serif lowercase italic">crafted with sincerity.</p>
        </div>
      </div>
    </footer>
  );
};
```

- [ ] **Step 2: `App.tsx` の Footer 呼び出しから `lang` prop を削除**

`App.tsx` の `<Footer lang={lang} />` を `<Footer />` に変更（他の部分はこの段階では変更しない）。

- [ ] **Step 3: ビルドで型エラーがないことを確認**

Run: `npm run build`
Expected: ビルド成功（`dist/` が生成される）。Footer 周りに型エラーが出ないこと。

- [ ] **Step 4: コミット**

```bash
git add components/Footer.tsx App.tsx
git commit -m "$(cat <<'EOF'
refactor(footer): 日本語化と年号 2026 への更新

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Hero を新メッセージ（案 B）と新 CTA に刷新

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `App.tsx`

- [ ] **Step 1: `Hero.tsx` を日本語のみ + 新コピーに書き換える**

タイトルは 3 行に分割：`AI 時代のマーケターを、` / `現場で` / `育てる。`（最後の行はイタリック + イエロー左罫線）。

`components/Hero.tsx` 全体を以下の内容で置き換える：

```tsx

import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-32 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#FFE600] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-[#333333] rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[#333333] border-b-2 border-[#FFE600]">
            私たちが目指すこと
          </span>
          <h1 className="text-[2.8rem] md:text-[4.5rem] lg:text-[6rem] font-serif text-[#333333] leading-[1.2] mb-12 animate-fade-in">
            AI 時代のマーケターを、<br />
            <span className="block mb-4">現場で</span>
            <span className="italic block mt-4 border-l-8 border-[#FFE600] pl-6 ml-[-12px]">育てる。</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#666666] leading-[2.0] max-w-2xl mb-16 opacity-90 font-light">
            生成 AI は触れる人がいて初めて武器になります。Makanin Labs は、企業のマーケティング組織に向けた講演・カスタムワークショップで、"明日から使える" 知識と判断軸を提供します。
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#contact" className="px-10 py-5 bg-[#333333] text-white font-bold rounded-none hover:bg-[#FFE600] hover:text-[#333333] transition-all duration-500 shadow-xl shadow-gray-100 text-center tracking-widest uppercase text-sm">
              講演・ワークショップを依頼する
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-4 text-[#CCCCCC] [-webkit-writing-mode:vertical-rl]">Scroll</p>
        <div className="w-px h-24 bg-[#E5E5E5] mx-auto"></div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: `App.tsx` の Hero 呼び出しから `lang` prop を削除**

`App.tsx` の `<Hero lang={lang} />` を `<Hero />` に変更。

- [ ] **Step 3: ビルドで型エラーがないことを確認**

Run: `npm run build`
Expected: ビルド成功。

- [ ] **Step 4: コミット**

```bash
git add components/Hero.tsx App.tsx
git commit -m "$(cat <<'EOF'
feat(hero): トレーニング送客向けに新コピーと CTA に刷新

「AI 時代のマーケターを、現場で育てる。」をメインタイトルに、
CTA を「講演・ワークショップを依頼する」に変更。

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Services を Topics にリネームし内容を 3 領域に刷新

**Files:**
- Create: `components/Topics.tsx`
- Delete: `components/Services.tsx`
- Modify: `App.tsx`

- [ ] **Step 1: `components/Topics.tsx` を新規作成**

`components/Topics.tsx` を以下の内容で新規作成する：

```tsx

import React from 'react';

const items = [
  {
    title: 'AI 導入の組織変革',
    subtitle: '組織と業務に AI を組み込む',
    description: 'ツール導入だけでは現場は動きません。AI を "誰が・何に・どう使うか" を業務フローに織り込み、属人化させずに組織として活用するための仕組みづくり。マーケ組織の変革プロセスを設計から伴走まで支援します。',
  },
  {
    title: 'AI を活用したコンテンツ制作',
    subtitle: '品質を落とさず、制作を加速する',
    description: 'コピー・ビジュアル・動画・SNS 投稿。生成 AI を制作実務に正しく組み込めば、量と速度を両立しながらクリエイティブの質を落とさずに済みます。実務で使える型と判断基準を、ワークショップ形式で提供します。',
  },
  {
    title: 'ツール・プロンプト実践',
    subtitle: 'ChatGPT / Claude / Gemini を使いこなす',
    description: '主要な生成 AI ツールにはそれぞれ得意・不得意があります。マーケ業務のシーン別にどのツールを選び、どんなプロンプトを書くか。ハンズオン形式で実務に直結するスキルを身につけます。',
  },
];

const ICONS = [
  // カード 1: 組織変革（building-office 系）
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  // カード 2: 制作（pencil-square 系）
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  // カード 3: ツール（command-line 系）
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
];

export const Topics: React.FC = () => {
  return (
    <section id="topics" className="py-48 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-32">
          <h2 className="text-xs font-bold text-[#333333] tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
            <span className="w-16 h-px bg-[#FFE600]"></span>
            Topics
          </h2>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <h3 className="text-5xl md:text-7xl font-serif text-[#333333] leading-[1.2]">3 つの専門領域</h3>
            <p className="text-[#666666] max-w-xl leading-[2.0] text-lg font-light">
              私たちが講演・ワークショップで扱う 3 つの領域です。組織導入から実務、ハンズオンまで一貫して支援します。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {items.map((item, index) => (
            <div key={index} className="relative group pt-12">
              <div className="absolute top-0 left-0 w-0 h-1 bg-[#FFE600] group-hover:w-full transition-all duration-700 ease-in-out"></div>

              <div className="mb-10 text-[#CCCCCC] group-hover:text-[#333333] transition-colors duration-500">
                {ICONS[index]}
              </div>

              <h4 className="text-2xl font-serif mb-3 text-[#333333] group-hover:translate-x-2 transition-transform duration-500">{item.title}</h4>
              <p className="text-sm font-bold tracking-wider text-[#999999] mb-6 uppercase">{item.subtitle}</p>
              <p className="text-[#666666] leading-[2.0] text-base font-light opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: 古い `components/Services.tsx` を削除**

Run: `git rm components/Services.tsx`

- [ ] **Step 3: `App.tsx` のインポートと使用箇所を更新**

`App.tsx` の以下を変更：
- `import { Services } from './components/Services';` → `import { Topics } from './components/Topics';`
- `<Services lang={lang} />` → `<Topics />`

- [ ] **Step 4: ビルドで型エラーがないことを確認**

Run: `npm run build`
Expected: ビルド成功。

- [ ] **Step 5: コミット**

```bash
git add components/Topics.tsx App.tsx
git commit -m "$(cat <<'EOF'
feat(topics): Services を Topics にリネームし 3 専門領域に刷新

組織導入 / コンテンツ制作 / ツール・プロンプト実践の 3 カードに変更。
アイコンを各領域に合わせて差し替え。

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Workshop セクションを新規作成し App に組み込む

**Files:**
- Create: `components/Workshop.tsx`
- Modify: `App.tsx`

- [ ] **Step 1: `components/Workshop.tsx` を新規作成**

`components/Workshop.tsx` を以下の内容で新規作成する：

```tsx

import React from 'react';

const items = [
  {
    label: 'Keynote / Speaking',
    title: '講演・登壇',
    summary: '60 〜 90 分の単発講演・登壇',
    description: '社内向けの経営層・全社イベントから、業界カンファレンス・パートナー向けセッション・ウェビナーまで対応。AI とマーケティングの現在地、組織がいま向き合うべき問いを、実践的な事例と共に語ります。',
    targetLabel: '想定',
    target: '経営会議 / 全社キックオフ / 業界カンファレンス / パートナー向けセッション',
  },
  {
    label: 'Workshop',
    title: 'カスタムワークショップ',
    summary: '2 時間 〜 1 日 / 貴社の課題に合わせて設計',
    description: '決まったコースは提供していません。貴社のマーケ組織の状況・課題・対象者をヒアリングした上で、内容を 1 から設計するハンズオン型ワークショップ。3 つの専門領域（組織導入 / コンテンツ制作 / ツール実践）から組み合わせます。',
    targetLabel: '想定',
    target: 'マーケ部門 5 〜 30 名 / 短時間セミナー〜半日・1 日研修 / オンライン or 対面',
  },
];

export const Workshop: React.FC = () => {
  return (
    <section id="workshop" className="py-48 bg-[#F9F9F9] overflow-hidden border-t border-[#E5E5E5]">
      <div className="container mx-auto px-6">
        <div className="mb-32">
          <h2 className="text-xs font-bold text-[#333333] tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
            <span className="w-16 h-px bg-[#FFE600]"></span>
            Workshop
          </h2>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <h3 className="text-5xl md:text-7xl font-serif text-[#333333] leading-[1.2]">依頼形態</h3>
            <p className="text-[#666666] max-w-xl leading-[2.0] text-lg font-light">
              貴社の課題に合わせた、カスタム形式で提供します。決まったコースはありません。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {items.map((item, index) => (
            <div key={index} className="bg-white p-12 md:p-16 border border-[#E5E5E5] relative group">
              <div className="absolute top-0 left-0 w-0 h-1 bg-[#FFE600] group-hover:w-full transition-all duration-700 ease-in-out"></div>

              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#999999] mb-6">{item.label}</p>
              <h4 className="text-3xl md:text-4xl font-serif mb-4 text-[#333333]">{item.title}</h4>
              <p className="text-base font-bold tracking-wider text-[#333333] mb-8">{item.summary}</p>
              <p className="text-[#666666] leading-[2.0] text-base font-light mb-10">
                {item.description}
              </p>
              <div className="border-t border-[#E5E5E5] pt-6">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#CCCCCC] mb-3">{item.targetLabel}</p>
                <p className="text-sm text-[#666666] font-light leading-[1.8]">{item.target}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="text-[#666666] leading-[2.0] text-lg font-light italic">
            ご依頼内容・規模・予算など、まずはお気軽にご相談ください。
          </p>
          <a href="#contact" className="inline-block mt-8 px-10 py-4 bg-[#333333] text-white font-bold tracking-widest uppercase text-xs hover:bg-[#FFE600] hover:text-[#333333] transition-all duration-500">
            ご相談はこちら
          </a>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: `App.tsx` に Workshop を import し、Topics と ContactSection の間に配置**

`App.tsx` を以下のように更新する：

```tsx

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Topics } from './components/Topics';
import { Workshop } from './components/Workshop';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export type Language = 'ja' | 'en';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Language>('ja');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100">
      <Header scrolled={scrolled} lang={lang} setLang={setLang} />
      <main className="flex-grow">
        <Hero />
        <Topics />
        <Workshop />
        <ContactSection lang={lang} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
```

> 注：この時点ではまだ `Header` と `ContactSection` が `lang` を要求しているため、`Language` 型と state は残す。Task 5・6・7 で順次削除する。

- [ ] **Step 3: ビルドで型エラーがないことを確認**

Run: `npm run build`
Expected: ビルド成功。

- [ ] **Step 4: コミット**

```bash
git add components/Workshop.tsx App.tsx
git commit -m "$(cat <<'EOF'
feat(workshop): 依頼形態を提示する Workshop セクションを新規追加

講演・登壇 / カスタムワークショップの 2 カラム構成。
Topics と Contact の間に配置。

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: ContactSection を日本語化し placeholder を更新

**Files:**
- Modify: `components/ContactSection.tsx`
- Modify: `App.tsx`

- [ ] **Step 1: `ContactSection.tsx` 全体を日本語のみに書き換える**

`components/ContactSection.tsx` 全体を以下の内容で置き換える：

```tsx

import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    form.submit();

    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      form.reset();

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 500);
  };

  return (
    <section id="contact" className="py-48 bg-white border-t border-[#E5E5E5]">
      <iframe name="hidden_iframe" id="hidden_iframe" style={{display: 'none'}}></iframe>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-xs font-bold text-[#333333] tracking-[0.3em] uppercase mb-6 flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-[#FFE600]"></span>
              Contact
              <span className="w-12 h-px bg-[#FFE600]"></span>
            </h2>
            <h3 className="text-5xl md:text-6xl font-serif text-[#333333] mb-8 italic">お問い合わせ</h3>
            <p className="text-[#666666] leading-[2.0] text-lg font-light max-w-2xl mx-auto">
              講演・ワークショップのご依頼、AI 導入のご相談など、まずはお気軽にお問い合わせください。
            </p>
          </div>

          <div className="bg-[#F9F9F9] p-10 md:p-20 border border-[#E5E5E5] transition-all duration-700">
            {submitted ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-20 h-px bg-[#FFE600] mx-auto mb-10"></div>
                <h4 className="text-3xl font-serif text-[#333333] mb-6">送信完了</h4>
                <p className="text-[#666666] leading-relaxed">お問い合わせありがとうございました。内容を確認の上、担当者より折り返しご連絡いたします。</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                action="https://docs.google.com/forms/d/e/1FAIpQLSdExADzQVDQZnKlN_KxupVcHd0gmdy2oUnC2BZLvIeDyCResA/formResponse"
                target="hidden_iframe"
                method="POST"
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                <div className="space-y-4">
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">お名前 <span className="text-[#FFE600] underline">*</span></label>
                  <input
                    name="entry.464670817"
                    required
                    type="text"
                    placeholder="山田 太郎"
                    className="w-full px-0 py-4 bg-transparent border-b border-[#CCCCCC] focus:border-[#333333] outline-none transition-all placeholder:text-[#BBBBBB] text-lg font-light"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">貴社名 <span className="text-[#FFE600] underline">*</span></label>
                  <input
                    name="entry.609499387"
                    required
                    type="text"
                    placeholder="株式会社Makanin"
                    className="w-full px-0 py-4 bg-transparent border-b border-[#CCCCCC] focus:border-[#333333] outline-none transition-all placeholder:text-[#BBBBBB] text-lg font-light"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">メールアドレス <span className="text-[#FFE600] underline">*</span></label>
                  <input
                    name="emailAddress"
                    required
                    type="email"
                    placeholder="example@makanin.labs"
                    className="w-full px-0 py-4 bg-transparent border-b border-[#CCCCCC] focus:border-[#333333] outline-none transition-all placeholder:text-[#BBBBBB] text-lg font-light"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">お問い合わせ内容</label>
                  <textarea
                    name="entry.1321229048"
                    rows={6}
                    placeholder="ご依頼内容（講演・ワークショップなど）、ご検討中のテーマ、対象者・人数、ご希望時期などをご記入ください。"
                    className="w-full px-0 py-4 bg-transparent border-b border-[#CCCCCC] focus:border-[#333333] outline-none transition-all resize-none placeholder:text-[#BBBBBB] text-lg font-light"
                  ></textarea>
                </div>
                <div className="md:col-span-2 mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-6 bg-[#333333] text-white font-bold tracking-[0.4em] uppercase hover:bg-[#FFE600] hover:text-[#333333] transition-all duration-700 shadow-2xl shadow-gray-200 flex items-center justify-center space-x-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span className="text-xs">内容を送信する</span>
                        <svg className="w-6 h-px bg-current" viewBox="0 0 24 1"></svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: `App.tsx` の ContactSection 呼び出しから `lang` prop を削除**

`App.tsx` の `<ContactSection lang={lang} />` を `<ContactSection />` に変更。

- [ ] **Step 3: ビルドで型エラーがないことを確認**

Run: `npm run build`
Expected: ビルド成功。

- [ ] **Step 4: コミット**

```bash
git add components/ContactSection.tsx App.tsx
git commit -m "$(cat <<'EOF'
refactor(contact): 日本語化と placeholder の更新

placeholder を「ご依頼内容（講演・ワークショップなど）、
ご検討中のテーマ、対象者・人数、ご希望時期…」に変更。
textarea の rows を 4 から 6 に拡大。

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Header から JP/EN トグルを削除

**Files:**
- Modify: `components/Header.tsx`
- Modify: `App.tsx`

- [ ] **Step 1: `Header.tsx` 全体を日本語のみ + ミニマル構成に書き換える**

`components/Header.tsx` 全体を以下の内容で置き換える：

```tsx

import React from 'react';

interface HeaderProps {
  scrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-4 shadow-md border-b border-[#FFE600]' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-[#333333] flex items-center justify-center">
            <span className="text-white font-serif text-xl">M</span>
          </div>
          <span className="text-2xl font-serif tracking-widest text-[#333333]">Makanin Labs</span>
        </div>

        <nav className="flex items-center">
          <a
            href="#contact"
            className="px-6 py-3 bg-[#FFE600] text-[#333333] text-xs font-bold tracking-widest uppercase hover:bg-[#333333] hover:text-white transition-all duration-500 shadow-sm"
          >
            ご相談
          </a>
        </nav>
      </div>
    </header>
  );
};
```

- [ ] **Step 2: `App.tsx` の Header 呼び出しから `lang` / `setLang` prop を削除**

`App.tsx` の `<Header scrolled={scrolled} lang={lang} setLang={setLang} />` を `<Header scrolled={scrolled} />` に変更。

- [ ] **Step 3: ビルドで型エラーがないことを確認**

Run: `npm run build`
Expected: ビルド成功。

- [ ] **Step 4: コミット**

```bash
git add components/Header.tsx App.tsx
git commit -m "$(cat <<'EOF'
refactor(header): JP/EN トグルを削除しミニマル構成に変更

ロゴ + 右上 CTA「ご相談」のみのレイアウトに簡素化。

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: App.tsx から Language 型と lang state を削除

**Files:**
- Modify: `App.tsx`

- [ ] **Step 1: `App.tsx` 全体を最終形に書き換える**

`App.tsx` 全体を以下の内容で置き換える：

```tsx

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Topics } from './components/Topics';
import { Workshop } from './components/Workshop';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100">
      <Header scrolled={scrolled} />
      <main className="flex-grow">
        <Hero />
        <Topics />
        <Workshop />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
```

> `Language` 型の export と `lang` state、`setLang` を完全に削除。

- [ ] **Step 2: ビルドで型エラーがないことを確認**

Run: `npm run build`
Expected: ビルド成功。`Language` 型を import している箇所が他になければ通る。

- [ ] **Step 3: コミット**

```bash
git add App.tsx
git commit -m "$(cat <<'EOF'
refactor(app): バイリンガル機構を完全に削除

Language 型・lang state・setLang を撤去。
日本語のみのサイトとして構造を簡素化。

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: index.html のメタ情報を更新

**Files:**
- Modify: `index.html`

- [ ] **Step 1: `<title>` を更新**

`index.html` の以下の行を変更：

旧:
```html
<title>Makanin Labs | AI Marketing Support</title>
```

新:
```html
<title>Makanin Labs - AI × Marketing 講演・ワークショップ</title>
```

- [ ] **Step 2: `<meta name="description">` を追加**

`<title>` の直下に以下を追加（現状は description タグが存在しない）：

```html
<meta name="description" content="Makanin Labs は、AI × Marketing の講演・カスタムワークショップを提供します。生成 AI を組織にどう導入し、現場で機能させるか。マーケティング組織の育成と変革を支援します。" />
```

- [ ] **Step 3: ビルドで成功することを確認**

Run: `npm run build`
Expected: ビルド成功。

> 注：`<html lang="ja">` は既に正しく設定されているため変更不要。

- [ ] **Step 4: コミット**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
chore(meta): title と description をトレーニング送客向けに更新

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: 最終ビルドと目視確認

**Files:**
- なし（検証のみ）

- [ ] **Step 1: クリーンビルドを実行**

Run:
```bash
rm -rf dist && npm run build
```

Expected: エラーなくビルドが完了し、`dist/` ディレクトリに `index.html` と JS / CSS バンドルが生成される。

- [ ] **Step 2: 開発サーバを起動して目視確認**

Run: `npm run dev`

ブラウザで `https://localhost:5173/`（HTTPS の自己署名証明書を許可）を開き、以下を目視確認する：

- [ ] **Header**：ロゴ + 「ご相談」ボタンのみ表示。JP/EN トグルが消えている
- [ ] **Hero**：「AI 時代のマーケターを、現場で育てる。」が 3 行で表示。「育てる。」がイタリック + イエロー左罫線。CTA が「講演・ワークショップを依頼する」
- [ ] **Topics**：見出し `Topics`、3 カードが「AI 導入の組織変革 / AI を活用したコンテンツ制作 / ツール・プロンプト実践」になっている
- [ ] **Workshop**：見出し `Workshop`、2 カード（講演・登壇 / カスタムワークショップ）が並ぶ。背景色 `#F9F9F9`
- [ ] **Contact**：placeholder が「ご依頼内容（講演・ワークショップなど）…」になっている。textarea は 6 行
- [ ] **Footer**：コピーライトが `© 2026 Makanin Labs All Rights Reserved.` 。tagline が日本語のみ
- [ ] **アンカーリンク**：Header の「ご相談」、Hero の「講演・ワークショップを依頼する」、Workshop の「ご相談はこちら」、すべてが Contact セクションへスクロールする
- [ ] **レスポンシブ**：Chrome DevTools で 375px / 768px / 1280px の各幅で大きなレイアウト崩れがない
- [ ] **ブラウザコンソール**：エラー・警告が出ていない

- [ ] **Step 3: フォーム送信テスト（任意・確実に確認したい場合のみ）**

実際に Google フォームへテスト送信し、紐付いたレスポンスシートに記録されることを確認する（既存挙動の確認のため、本来は変更がないが念のため）。

- [ ] **Step 4: 修正があればコミット**

目視確認で軽微な調整が必要になった場合のみコミット。なければスキップ。

```bash
# 例：何か微調整した場合
git add <修正したファイル>
git commit -m "$(cat <<'EOF'
fix: 目視確認後の微調整

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## 実装後の運用

- デプロイは別途ユーザー判断で実施：
  ```bash
  npm run build
  firebase deploy --only hosting
  ```
- ステージング環境はないため、デプロイ前に `npm run preview` でプロダクションビルドを最終確認することを推奨

## スコープ外（再掲）

このプランで実装しないもの（設計ドキュメントの 10 章 "将来課題" に対応）：

- `/insights` ページ（月次キュレーション）
- `/slides` ページ（登壇スライド埋め込み）
- 講師紹介セクション
- 数値による Track Record セクション
- React Router 導入、Markdown ローダー、ヘッドレス CMS
- Tailwind の CDN → ローカル化
- OGP 画像の刷新
- Contact フォームのエラーハンドリング改善（ネットワーク失敗時の UX）
