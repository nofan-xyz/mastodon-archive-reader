/**
 * i18n translations for ActivityPub Archive Reader.
 * Flat key structure with {placeholder} template support.
 */

export type Language = 'en' | 'zh'

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'header.productName': 'Archive Reader',
    'header.subtitle': 'ActivityPub / Mastodon',
    'header.searchPlaceholder': 'Search your archive...',
    'header.privacyBadge': 'All local. Nothing uploaded.',
    'header.loading': 'Loading...',
    'header.newArchive': 'New Archive',
    'header.donate': 'Donate',

    // Sidebar / Navigation
    'nav.overview': 'Overview',
    'nav.posts': 'Posts',
    'nav.media': 'Media',
    'nav.likes': 'Likes',
    'nav.bookmarks': 'Bookmarks',
    'nav.search': 'Search',
    'sidebar.yourData': 'Your data,',
    'sidebar.yourBrowser': 'your browser.',

    // Import page
    'import.kicker': 'ActivityPub / Mastodon',
    'import.title': 'Archive Reader',
    'import.subtitle': 'Drop your exported archive and browse your posts, media, likes, and bookmarks — all in your browser. No server, no upload, just you and your data.',
    'import.exportHint': "Export your archive from Mastodon: Settings → Import and export → Data export → Request your archive. You'll get a ZIP with everything inside.",
    'import.footer': 'Your archive never leaves your browser. No tracking, no analytics, no nonsense.',

    // Upload zone
    'upload.parsing': 'Parsing archive...',
    'upload.dropHere': 'Drop your archive here',
    'upload.extracting': 'Extracting your data locally. Give it a moment.',
    'upload.dragDrop': 'Drag & drop your .zip file, or click to browse',
    'upload.supports': 'Supports:',
    'upload.noArchive': 'No archive handy?',
    'upload.demoData': 'Try with demo data',

    // Overview page
    'overview.title': 'Overview',
    'overview.subtitle': 'Your archive at a glance.',
    'overview.totalPosts': 'Total Posts',
    'overview.mediaItems': 'Media Items',
    'overview.likes': 'Likes',
    'overview.bookmarks': 'Bookmarks',
    'overview.accountDetails': 'Account Details',
    'overview.instance': 'Instance',
    'overview.username': 'Username',
    'overview.memberSince': 'Member since',
    'overview.manuallyApproves': 'Manually approves',
    'overview.discoverable': 'Discoverable',
    'overview.totalStatuses': 'Total statuses',
    'common.yes': 'Yes',
    'common.no': 'No',

    // Posts page
    'posts.title': 'Posts',
    'posts.count': '{count} posts in your archive.',
    'posts.countOne': '1 post in your archive.',
    'posts.empty': 'No posts found',
    'posts.emptyMessage': 'Try adjusting your filters or search terms. Your posts are here somewhere!',

    // Media page
    'media.title': 'Media',
    'media.count': '{count} media items across your posts.',
    'media.images': 'Images',
    'media.videos': 'Videos',
    'media.links': 'Links',
    'media.empty': 'No media in this archive',
    'media.emptyMessage': 'Images, videos, and link previews from your posts will show up here.',

    // Likes page
    'likes.title': 'Likes',
    'likes.count': '{count} posts you\'ve liked.',
    'likes.empty': 'No likes in this archive',
    'likes.emptyMessage': 'Posts you\'ve liked will appear here once you import an archive with likes.json.',

    // Bookmarks page
    'bookmarks.title': 'Bookmarks',
    'bookmarks.count': '{count} posts you\'ve saved.',
    'bookmarks.empty': 'No bookmarks in this archive',
    'bookmarks.emptyMessage': 'Posts you\'ve bookmarked will appear here once you import an archive with bookmarks.json.',

    // Common
    'common.viewOriginal': 'View original',
    'common.viewOriginalProfile': 'View original profile',
    'common.since': 'since',

    // Search page
    'search.title': 'Search',
    'search.subtitle': 'Find anything across your archive.',
    'search.placeholder': 'Search posts, hashtags, content...',
    'search.resultsCount': '{count} results for',
    'search.resultCount': '1 result for',
    'search.noResults': 'No matching posts found',
    'search.noResultsMessage': 'Try a different keyword, or switch the search scope to likes or bookmarks.',
    'search.startTyping': 'Start typing to search',
    'search.startTypingMessage': 'Search across your posts, likes, and bookmarks. Results update as you type.',

    // Filter bar
    'filter.newestFirst': 'Newest first',
    'filter.oldestFirst': 'Oldest first',
    'filter.withMedia': 'With media',

    // PostCard
    'post.boosted': 'Boosted',

    // ProfileCard
    'profile.posts': 'Posts',
    'profile.following': 'Following',
    'profile.followers': 'Followers',

    // Footer
    'footer.loveFrom': 'love from',
    'footer.copyright': '© {year}',
  },

  zh: {
    // Header
    'header.productName': '存档阅读器',
    'header.subtitle': 'ActivityPub / Mastodon',
    'header.searchPlaceholder': '搜索你的存档...',
    'header.privacyBadge': '全部本地处理，绝不上传',
    'header.loading': '加载中...',
    'header.newArchive': '导入存档',
    'header.donate': '赞助',

    // Sidebar / Navigation
    'nav.overview': '概览',
    'nav.posts': '帖子',
    'nav.media': '媒体',
    'nav.likes': '点赞',
    'nav.bookmarks': '收藏',
    'nav.search': '搜索',
    'sidebar.yourData': '你的数据，',
    'sidebar.yourBrowser': '你的浏览器。',

    // Import page
    'import.kicker': 'ActivityPub / Mastodon',
    'import.title': '存档阅读器',
    'import.subtitle': '拖入你导出的存档，在浏览器里浏览你的帖子、媒体、点赞和收藏——无需服务器，不上传，只有你和你的数据。',
    'import.exportHint': '从 Mastodon 导出存档：设置 → 导入和导出 → 数据导出 → 请求存档。你会得到一个包含所有数据的 ZIP 文件。',
    'import.footer': '你的存档永远不会离开浏览器。无追踪，无分析，不搞那些有的没的。',

    // Upload zone
    'upload.parsing': '正在解析存档...',
    'upload.dropHere': '把存档拖到这里',
    'upload.extracting': '正在本地解压数据，稍等一下。',
    'upload.dragDrop': '拖放 .zip 文件，或点击选择',
    'upload.supports': '支持格式：',
    'upload.noArchive': '手头没有存档？',
    'upload.demoData': '用演示数据体验',

    // Overview page
    'overview.title': '概览',
    'overview.subtitle': '一览你的存档全貌。',
    'overview.totalPosts': '帖子总数',
    'overview.mediaItems': '媒体数量',
    'overview.likes': '点赞',
    'overview.bookmarks': '收藏',
    'overview.accountDetails': '账号详情',
    'overview.instance': '实例',
    'overview.username': '用户名',
    'overview.memberSince': '注册时间',
    'overview.manuallyApproves': '手动审核关注',
    'overview.discoverable': '可被发现',
    'overview.totalStatuses': '帖子总数',
    'common.yes': '是',
    'common.no': '否',

    // Posts page
    'posts.title': '帖子',
    'posts.count': '你的存档中有 {count} 条帖子。',
    'posts.countOne': '你的存档中有 1 条帖子。',
    'posts.empty': '未找到帖子',
    'posts.emptyMessage': '试试调整筛选条件或搜索关键词，你的帖子就在某个角落！',

    // Media page
    'media.title': '媒体',
    'media.count': '你的帖子中有 {count} 个媒体文件。',
    'media.images': '图片',
    'media.videos': '视频',
    'media.links': '链接',
    'media.empty': '此存档中没有媒体',
    'media.emptyMessage': '帖子中的图片、视频和链接预览会显示在这里。',

    // Likes page
    'likes.title': '点赞',
    'likes.count': '你点赞了 {count} 条帖子。',
    'likes.empty': '此存档中没有点赞',
    'likes.emptyMessage': '导入包含 likes.json 的存档后，你点赞的帖子会出现在这里。',

    // Bookmarks page
    'bookmarks.title': '收藏',
    'bookmarks.count': '你收藏了 {count} 条帖子。',
    'bookmarks.empty': '此存档中没有收藏',
    'bookmarks.emptyMessage': '导入包含 bookmarks.json 的存档后，你收藏的帖子会出现在这里。',

    // Common
    'common.viewOriginal': '查看原文',
    'common.viewOriginalProfile': '查看原始主页',
    'common.since': '始于',

    // Search page
    'search.title': '搜索',
    'search.subtitle': '在存档中查找任何内容。',
    'search.placeholder': '搜索帖子、标签、内容...',
    'search.resultsCount': '{count} 条结果，关键词',
    'search.resultCount': '1 条结果，关键词',
    'search.noResults': '未找到匹配的帖子',
    'search.noResultsMessage': '试试其他关键词，或者切换搜索范围到点赞或收藏。',
    'search.startTyping': '开始输入以搜索',
    'search.startTypingMessage': '搜索你的帖子、点赞和收藏，输入时实时更新结果。',

    // Filter bar
    'filter.newestFirst': '最新优先',
    'filter.oldestFirst': '最早优先',
    'filter.withMedia': '含媒体',

    // PostCard
    'post.boosted': '转嘟',

    // ProfileCard
    'profile.posts': '帖子',
    'profile.following': '关注中',
    'profile.followers': '关注者',

    // Footer
    'footer.loveFrom': '来自',
    'footer.copyright': '© {year}',
  },
}
