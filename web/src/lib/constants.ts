export const VERSION_ORDER = [
  "s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s10", "s11", "s12"
] as const;

export const LEARNING_PATH = VERSION_ORDER;

export type VersionId = typeof LEARNING_PATH[number];

export const VERSION_META: Record<string, {
  title: string;
  subtitle: string;
  coreAddition: string;
  keyInsight: string;
  layer: "tools" | "planning" | "memory" | "concurrency" | "collaboration";
  prevVersion: string | null;
}> = {
  s01: { title: "The Agent Loop", subtitle: "一个 Bash 就够了", coreAddition: "单工具 Agent 循环", keyInsight: "最小可用的 Agent 内核，就是一个 while 循环加一个工具", layer: "tools", prevVersion: null },
  s02: { title: "Tools", subtitle: "每个工具一个处理器", coreAddition: "工具分发映射表", keyInsight: "循环本身不变，只需要把新工具注册进分发表", layer: "tools", prevVersion: "s01" },
  s03: { title: "TodoWrite", subtitle: "先规划，再执行", coreAddition: "TodoManager 与提醒机制", keyInsight: "没有计划的 Agent 很容易漂移，先列步骤再动手", layer: "planning", prevVersion: "s02" },
  s04: { title: "Subagents", subtitle: "每个子任务独立上下文", coreAddition: "带隔离 messages[] 的子 Agent 派生", keyInsight: "子 Agent 使用独立上下文，避免主对话被细节污染", layer: "planning", prevVersion: "s03" },
  s05: { title: "Skills", subtitle: "按需注入知识", coreAddition: "SkillLoader 与双层注入", keyInsight: "需要时再通过 tool_result 注入知识，而不是预先塞进 system prompt", layer: "planning", prevVersion: "s04" },
  s06: { title: "Compact", subtitle: "三层压缩策略", coreAddition: "微压缩、自动压缩与归档", keyInsight: "上下文一定会满，三层压缩才能支撑无限会话", layer: "memory", prevVersion: "s05" },
  s07: { title: "Tasks", subtitle: "任务图与依赖关系", coreAddition: "基于文件状态和依赖图的 TaskManager", keyInsight: "文件化任务图提供顺序、并行和依赖管理，是多 Agent 协作骨架", layer: "planning", prevVersion: "s06" },
  s08: { title: "Background Tasks", subtitle: "后台线程与通知", coreAddition: "BackgroundManager 与通知队列", keyInsight: "耗时操作放到后台跑，Agent 前台继续推进下一步", layer: "concurrency", prevVersion: "s07" },
  s09: { title: "Agent Teams", subtitle: "队友与收件箱", coreAddition: "TeammateManager 与文件邮箱", keyInsight: "一个 Agent 做不完时，就把任务异步委托给持久化队友", layer: "collaboration", prevVersion: "s08" },
  s10: { title: "Team Protocols", subtitle: "共享通信规则", coreAddition: "两个协议共用的 request_id 关联机制", keyInsight: "统一的请求-响应模式可以驱动整套团队协作协议", layer: "collaboration", prevVersion: "s09" },
  s11: { title: "Autonomous Agents", subtitle: "扫描任务板并主动认领", coreAddition: "任务板轮询与超时自治", keyInsight: "队友能自己扫描任务板并认领任务，不再依赖组长逐个分配", layer: "collaboration", prevVersion: "s10" },
  s12: { title: "Worktree + Task Isolation", subtitle: "按目录隔离执行", coreAddition: "可组合的 worktree 生命周期与共享任务板事件流", keyInsight: "每个任务在独立目录执行，任务管理目标，worktree 管理执行空间", layer: "collaboration", prevVersion: "s11" },
};

export const LAYERS = [
  { id: "tools" as const, label: "Tools & Execution", color: "#3B82F6", versions: ["s01", "s02"] },
  { id: "planning" as const, label: "Planning & Coordination", color: "#10B981", versions: ["s03", "s04", "s05", "s07"] },
  { id: "memory" as const, label: "Memory Management", color: "#8B5CF6", versions: ["s06"] },
  { id: "concurrency" as const, label: "Concurrency", color: "#F59E0B", versions: ["s08"] },
  { id: "collaboration" as const, label: "Collaboration", color: "#EF4444", versions: ["s09", "s10", "s11", "s12"] },
] as const;
