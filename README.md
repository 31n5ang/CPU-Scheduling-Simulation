# CPU-Scheduling-Simulation

최대 4개의 프로세서를 이용해 프로세스를 할당하는 스케줄링 시뮬레이션입니다.

최대 15개의 프로세서, 최대 4개의 프로세서를 선택할 수 있습니다.

총 소비전력은 아래와 같이 계산 됩니다.

E 코어 : 1초에 1의 일을 처리, 1초에 전력 1W 소비 (시동 전력 0.1W)

P 코어 : 2배 성능, 3배의 전력 소비 0.5W 소비 (시동 전력 0.5W)

시동 전력 : 미사용 중이던 코어(프로세서)를 사용하는 경우 발생

선택할 수 있는 스케줄링은 Round Robin(RR), First Come First(FCFS), Shortest Process Next(SPN), Shortest Remaining Time Next(SRTN), High Response Ratio Next(HRRN)가 있고, 추가적으로 Process Shuffling With Greedy(PSWG)가 존재합니다.

PSWG 스케줄링은 첫 번째 코어에 가장 짧은 프로세스를 계속 선점하여 할당하는 방식으로, 나머지 코어는 대기중인 프로세스 중 가장 짧은 프로세스 할당, 가장 긴 프로세스 할당을 반복하며 비선점 방식으로 작동합니다.


해당 프로젝트는 KOREATECH. 2023-1학기 운영체제(OS) 과목 팀 프로젝트입니다.

기술 스택 : Python + Pyscript, Javascript, HTML, CSS

* 본인은 RR, FCFS(Python) 와 전반적인 시각화(Pyscript, Javascript)를 담당하였습니다.
