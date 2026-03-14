import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import SectionWrapper from "../Components/SectionWrapper";
import { Send, CheckCircle, AlertCircle, Github, Linkedin, Mail } from "lucide-react";

// EmailJS credentials
const SERVICE_ID  = "service_dfuheb5";
const TEMPLATE_ID = "template_fz8syc3";   // "Contact Us" template → sends to you
const AUTO_REPLY_TEMPLATE_ID = "template_ivdkwoj"; // Auto-reply → sends to user
const PUBLIC_KEY  = "E6JO-uj8R8fbgMQ0y";

const socialLinks = [
  { icon: Github, label: "GitHub",   href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail,   label: "Email",    href: "mailto:chinkatesuraj@gmail.com" },
];

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");
  const { ref, inView }       = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const templateParams = {
      from_name:  form.name,
      from_email: form.email,
      message:    form.message,
      reply_to:   form.email,
    };

    try {
      // 1. Send message to you
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      // 2. Send auto-reply to the user
      await emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper title="Contact Me">
      <div ref={ref} className="grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <h3
            className="font-display text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Let's build something great together
          </h3>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
            Whether you have a project idea, want to collaborate, or just want to say hi —
            my inbox is always open. I'll get back to you as soon as possible.
          </p>

          {/* Social links */}
          <div className="flex flex-col gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 group"
                style={{ color: "var(--text-secondary)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Icon size={15} style={{ color: "var(--accent)" }} />
                </div>
                <span
                  className="text-sm font-medium transition-colors group-hover:text-accent"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card rounded-2xl p-7 space-y-5"
        >
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 gap-4"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}
              >
                <CheckCircle size={26} style={{ color: "#22c55e" }} />
              </div>
              <h4 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Message sent!
              </h4>
              <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                I'll get back to you soon. Check your inbox for a confirmation.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="text-xs underline"
                style={{ color: "var(--accent)" }}
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <>
              {/* Name */}
              <div>
                <label className="block mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  className="form-input resize-none"
                />
              </div>

              {/* Error message */}
              {error && (
                <div
                  className="flex items-start gap-2 p-3 rounded-xl text-xs"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    color: "#ef4444",
                  }}
                >
                  <AlertCircle size={13} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-white"
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
              </motion.button>
            </>
          )}
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
