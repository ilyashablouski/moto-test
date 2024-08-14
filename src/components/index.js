/** Automatic import styles from components */
const importedAllStyles = import.meta.glob('./**/*.scss');

Object.keys(importedAllStyles).forEach((path) => importedAllStyles[path]());
