export const NOTICE_BAR_HEIGHT = 28;

export default function NoticeBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-center gap-2 font-mono text-xs"
      style={{
        height: NOTICE_BAR_HEIGHT,
        background: 'rgba(8, 8, 8, 0.9)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        color: 'rgba(255, 255, 255, 0.5)',
        zIndex: 101,
      }}
    >
      <span>New version under construction.</span>
      <a href="/" className="underline hover:text-white">
        Take a look
      </a>
    </div>
  );
}
