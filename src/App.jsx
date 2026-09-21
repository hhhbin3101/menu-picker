import React, { useState } from 'react';

export default function App() {
  const [menus, setMenus] = useState(['김치찌개', '돈까스', '짜장면', '초밥', '햄버거']);
  const [inputValue, setInputValue] = useState('');
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  // 메뉴 추가
  const handleAddMenu = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (menus.includes(inputValue.trim())) {
      alert('이미 존재하는 메뉴입니다!');
      return;
    }
    setMenus([...menus, inputValue.trim()]);
    setInputValue('');
  };

  // 메뉴 삭제
  const handleRemoveMenu = (indexToRemove) => {
    setMenus(menus.filter((_, index) => index !== indexToRemove));
    // 만약 삭제한 메뉴가 현재 선택된 메뉴라면 결과 초기화
    if (selectedMenu === menus[indexToRemove]) {
      setSelectedMenu(null);
    }
  };

  // 랜덤 메뉴 뽑기 (룰렛처럼 슬쩍 굴러가는 효과 포함)
  const handlePickRandom = () => {
    if (menus.length === 0) {
      alert('추천할 메뉴를 최소 1개 이상 추가해주세요!');
      return;
    }

    setIsRolling(true);
    setSelectedMenu(null);

    let count = 0;
    const maxCount = 10; // 번쩍이는 횟수
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * menus.length);
      setSelectedMenu(menus[randomIndex]);
      count++;

      if (count >= maxCount) {
        clearInterval(interval);
        // 최종 당첨 메뉴 확정
        const finalIndex = Math.floor(Math.random() * menus.length);
        setSelectedMenu(menus[finalIndex]);
        setIsRolling(false);
      }
    }, 100);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎲 오늘 뭐 먹지?</h1>
        <p style={styles.subtitle}>메뉴를 추가하고 랜덤으로 추천받아보세요!</p>

        {/* 메뉴 입력 폼 */}
        <form onSubmit={handleAddMenu} style={styles.form}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="메뉴를 입력하세요 (예: 제육볶음)"
            style={styles.input}
          />
          <button type="submit" style={styles.addButton}>추가</button>
        </form>

        {/* 결과 표시 영역 */}
        <div style={{ ...styles.resultBox, borderColor: isRolling ? '#ff9800' : '#4caf50' }}>
          {selectedMenu ? (
            <div style={styles.resultText}>
              {isRolling ? '룰렛 돌아가는 중...' : '🎉 오늘의 추천 메뉴!'}
              <h2 style={{ ...styles.resultName, transform: isRolling ? 'scale(1.05)' : 'scale(1)' }}>
                {selectedMenu}
              </h2>
            </div>
          ) : (
            <p style={styles.placeholderText}>버튼을 눌러 메뉴를 골라보세요!</p>
          )}
        </div>

        {/* 추천 실행 버튼 */}
        <button
          onClick={handlePickRandom}
          disabled={isRolling || menus.length === 0}
          style={{
            ...styles.pickButton,
            backgroundColor: isRolling || menus.length === 0 ? '#cccccc' : '#ff4757',
            cursor: isRolling || menus.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          {isRolling ? '추천 중...' : '메뉴 골라주기!'}
        </button>

        {/* 메뉴 목록 리스트 */}
        <div style={styles.listContainer}>
          <div style={styles.listHeader}>
            <span>후보 메뉴 목록 ({menus.length}개)</span>
          </div>
          {menus.length === 0 ? (
            <p style={styles.emptyText}>등록된 메뉴가 없습니다.</p>
          ) : (
            <ul style={styles.ul}>
              {menus.map((menu, index) => (
                <li key={index} style={styles.li}>
                  <span>{menu}</span>
                  <button
                    onClick={() => handleRemoveMenu(index)}
                    style={styles.deleteButton}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// 인라인 스타일 객체
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '420px',
    boxSizing: 'border-box',
  },
  title: {
    margin: '0 0 5px 0',
    fontSize: '24px',
    color: '#333333',
    textAlign: 'center',
  },
  subtitle: {
    margin: '0 0 20px 0',
    fontSize: '14px',
    color: '#777777',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
  },
  addButton: {
    padding: '10px 16px',
    backgroundColor: '#2ed573',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  resultBox: {
    padding: '20px',
    borderRadius: '12px',
    border: '2px dashed #4caf50',
    backgroundColor: '#fafafa',
    textAlign: 'center',
    marginBottom: '20px',
    minHeight: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease',
  },
  resultText: {
    fontSize: '13px',
    color: '#555',
  },
  resultName: {
    margin: '8px 0 0 0',
    fontSize: '26px',
    color: '#ff4757',
    transition: 'transform 0.1s ease',
  },
  placeholderText: {
    margin: 0,
    color: '#aaa',
    fontSize: '14px',
  },
  pickButton: {
    width: '100%',
    padding: '12px',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '24px',
    transition: 'background-color 0.2s',
  },
  listContainer: {
    borderTop: '1px solid #eee',
    paddingTop: '16px',
  },
  listHeader: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '10px',
  },
  emptyText: {
    fontSize: '13px',
    color: '#aaa',
    textAlign: 'center',
    margin: '10px 0',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxHeight: '150px',
    overflowY: 'auto',
  },
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    marginBottom: '6px',
    fontSize: '14px',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ff4757',
    fontSize: '12px',
    cursor: 'pointer',
    padding: '2px 6px',
  },
};