"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, Clock, Plus, Minus, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "What are your shipping options?",
    a: "We offer standard (5-7 business days), express (2-3 business days), and overnight shipping. Free standard shipping on all orders over $150.",
  },
  {
    q: "How long will it take to receive my order?",
    a: "Most orders are processed within 1-2 business days. Delivery times depend on your chosen shipping method and location.",
  },
  {
    q: "Can I return or exchange an item?",
    a: "Yes. We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order ships, you will receive a confirmation email with a tracking number. You can use it on our Track Order page.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to over 40 countries. International shipping rates and delivery times vary by destination.",
  },
];

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Call Us",
    line1: "+1 (888) 123-4567",
    line2: "Mon - Fri, 9AM - 6PM (EST)",
  },
  {
    icon: Mail,
    label: "Email Us",
    line1: "hello@nexora.com",
    line2: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Our Office",
    line1: "123 Nexora Street",
    line2: "New York, NY 10001, USA",
  },
  {
    icon: Clock,
    label: "Business Hours",
    line1: "Mon - Fri: 9AM - 6PM (EST)",
    line2: "Sat - Sun: Closed",
  },
];

function FaqItem({ q, a, isOpen, onToggle }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    if (isOpen) {
      gsap.fromTo(
        bodyRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.32, ease: "power2.out" }
      );
    } else {
      gsap.to(bodyRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", cursor: "pointer" }}
      onClick={onToggle}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "20px 4px" }}>
        <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "13.5px", fontWeight: 500, fontFamily: "var(--font-syne)" }}>
          {q}
        </span>
        <span style={{ flexShrink: 0, color: "#C9A84C" }}>
          {isOpen ? <Minus size={15} strokeWidth={2} /> : <Plus size={15} strokeWidth={2} />}
        </span>
      </div>
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", lineHeight: 1.7, paddingBottom: "20px", paddingLeft: "4px", fontFamily: "var(--font-syne)" }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function ContactMain() {
  const sectionRef = useRef(null);
  const formRef    = useRef(null);
  const infoRef    = useRef(null);
  const faqRef     = useRef(null);
  const mapRef     = useRef(null);

  const [openFaq,   setOpenFaq]   = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      [formRef, infoRef, faqRef, mapRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "3px",
    padding: "13px 14px",
    color: "rgba(255,255,255,0.8)",
    fontSize: "12.5px",
    fontFamily: "var(--font-syne)",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const cardStyle = {
    background: "#111010",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "4px",
    padding: "clamp(28px, 4vw, 44px)",
    opacity: 0,
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0a0a0a] pb-24"
      style={{ fontFamily: "var(--font-syne)" }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">

        {/* FORM + CONTACT INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

          {/* FORM */}
          <div ref={formRef} style={cardStyle}>
            <h2
              className="text-white font-bold mb-1"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "22px" }}
            >
              Send us a message
            </h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", marginBottom: "28px", fontFamily: "var(--font-syne)" }}>
              We typically respond within 24 hours.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                  onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                  onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={5}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />

              <button
                type="submit"
                style={{
                  marginTop: "6px",
                  width: "100%",
                  padding: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-syne)",
                  background: submitted ? "#1f3320" : "#C9A84C",
                  color: submitted ? "#6db86d" : "#111111",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  transition: "background 0.3s, color 0.3s",
                }}
              >
                <Send size={13} strokeWidth={2} />
                {submitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div ref={infoRef} style={cardStyle}>
            <h2
              className="text-white font-bold mb-8"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "22px" }}
            >
              Other ways to reach us
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {CONTACT_ITEMS.map(({ icon: Icon, label, line1, line2 }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: "1px solid rgba(201,168,76,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#C9A84C",
                    }}
                  >
                    <Icon size={17} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p style={{ fontSize: "13.5px", fontWeight: 600, color: "#fff", fontFamily: "var(--font-syne)", marginBottom: "4px" }}>
                      {label}
                    </p>
                    <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-syne)", lineHeight: 1.6 }}>
                      {line1}
                    </p>
                    <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-syne)", lineHeight: 1.6 }}>
                      {line2}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MAP — free OpenStreetMap, no API key needed */}
        <div
          ref={mapRef}
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "4px",
            overflow: "hidden",
            height: "340px",
            marginBottom: "5px",
            opacity: 0,
          }}
        >
          <iframe
            title="Nexora Office Location"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(1) brightness(0.55) contrast(1.1)" }}
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0160%2C40.7028%2C-73.9760%2C40.7280&layer=mapnik&marker=40.7128%2C-74.0060"
          />
        </div>

        {/* FAQ */}
        <div
          ref={faqRef}
          className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 mt-16 sm:mt-20"
          style={{ opacity: 0 }}
        >
          <div>
            <p
              className="text-[#C9A84C] text-[10px] font-bold tracking-[0.25em] uppercase mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              FAQ
            </p>
            <h2
              className="text-white font-bold leading-tight mb-4"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(26px, 3vw, 38px)",
                letterSpacing: "-0.02em",
              }}
            >
              Frequently asked questions
            </h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12.5px", lineHeight: 1.7, marginBottom: "32px" }}>
              Quick answers to common questions.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-5 py-3 border border-white/18 text-white/65 hover:text-white hover:border-white/40 text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-200"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              View All FAQs
            </Link>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {FAQS.map((item, i) => (
              <FaqItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq((prev) => (prev === i ? null : i))}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}